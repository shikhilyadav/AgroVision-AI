# ============================================================
# AgroVision AI - Backend
# Multiple Image + Majority / Weighted Voting
# Crop Recommendation + Location-Aware Scoring
# State -> District API
# ============================================================

import os
import json
from pathlib import Path
from io import BytesIO
from urllib.request import Request, urlopen
import ssl
from urllib.parse import quote


import numpy as np
import tensorflow as tf

from PIL import Image

from fastapi import (
    FastAPI,
    File,
    UploadFile,
    HTTPException,
    Body
)

from fastapi.middleware.cors import CORSMiddleware


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = (
    BASE_DIR /
    "models" /
    "agrovision_best.keras"
)

CLASS_NAMES_PATH = (
    BASE_DIR /
    "models" /
    "class_names.json"
)

DISEASE_INFO_PATH = (
    BASE_DIR /
    "data" /
    "disease_info.json"
)

CROP_DATA_PATH = (
    BASE_DIR /
    "data" /
    "crop_recommendations.json"
)

DISTRICT_CROP_DATA_PATH = (
    BASE_DIR /
    "data" /
    "district_crop_data.json"
)

IMG_SIZE = (224, 224)

# Maximum images allowed
MAX_IMAGES = 3

# Minimum confidence for reliable prediction
CONFIDENCE_THRESHOLD = 50.0

# High confidence
HIGH_CONFIDENCE = 70.0

# Medium confidence
MEDIUM_CONFIDENCE = 50.0

# ============================================================
# CREATE APP
# ============================================================

app = FastAPI(
    title="AgroVision AI",
    description=(
        "AI-powered crop disease detection "
        "and management system"
    ),
    version="1.5.0"
)
## ============================================================
# IISFM STATE / DISTRICT API
# ============================================================

IISFM_API_URL = (
    "https://api.iisfm.nic.in"
)
def fetch_iisfm_json(url):
    """
    Fetch JSON data from IISFM API.
    """
    try:
        request = Request(
            url,
            headers={
                "User-Agent": "AgroVision-AI/1.0",
                "Accept": "application/json"
            }
        )

        ssl_context = ssl._create_unverified_context()

        with urlopen(
            request,
            timeout=10,
            context=ssl_context
) as response:
            data = response.read().decode("utf-8")

        return json.loads(data)

    except Exception as e:
        print("IISFM API error:", e)

        raise HTTPException(
            status_code=502,
            detail="Unable to fetch location data."
        )
@app.get("/states")
def get_states():
    """
    Get all states and union territories
    from IISFM API.
    """

    url = (
        f"{IISFM_API_URL}"
        "/Revenues"
    )

    data = fetch_iisfm_json(url)

    return {
        "states": data
    }
def get_iisfm_districts(state_code):
    """
    Get districts for a state from IISFM API.
    """

    url = (
        f"{IISFM_API_URL}"
        f"/Revenues/{state_code}/RvnDist"
    )

    data = fetch_iisfm_json(url)

    districts = []

    for item in data:
        district_name = item.get("RevDistName")

        if district_name:
            districts.append(
                district_name.strip()
            )

    return districts

# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ============================================================
# CHECK REQUIRED FILES
# ============================================================

required_files = [
    MODEL_PATH,
    CLASS_NAMES_PATH,
    DISEASE_INFO_PATH
]

for required_file in required_files:

    if not os.path.exists(required_file):

        raise FileNotFoundError(
            f"Required file not found: {required_file}"
        )


# ============================================================
# LOAD MODEL
# ============================================================

print("Loading AgroVision AI model...")

model = tf.keras.models.load_model(
    MODEL_PATH
)

print("Model loaded successfully.")


# ============================================================
# LOAD CLASS NAMES
# ============================================================

with open(
    CLASS_NAMES_PATH,
    "r",
    encoding="utf-8"
) as file:

    class_names = json.load(file)


# ============================================================
# LOAD DISEASE DATABASE
# ============================================================

with open(
    DISEASE_INFO_PATH,
    "r",
    encoding="utf-8"
) as file:

    disease_info = json.load(file)


print(
    f"Number of classes: {len(class_names)}"
)

print(
    f"Disease information entries: "
    f"{len(disease_info)}"
)


# ============================================================
# LOAD CROP RECOMMENDATION DATABASE
# ============================================================

crop_data = []

if os.path.exists(CROP_DATA_PATH):

    try:

        with open(
            CROP_DATA_PATH,
            "r",
            encoding="utf-8"
        ) as file:

            crop_data = json.load(file)

        # Support:
        #
        # [
        #     {...},
        #     {...}
        # ]
        #
        # and:
        #
        # {
        #     "crops": [...]
        # }

        if isinstance(crop_data, dict):

            crop_data = crop_data.get(
                "crops",
                []
            )

        if not isinstance(crop_data, list):

            crop_data = []

        print(
            f"Crop recommendation entries: "
            f"{len(crop_data)}"
        )

    except Exception as error:

        print(
            "Could not load crop recommendation "
            f"database: {error}"
        )

        crop_data = []

else:

    print(
        "Crop recommendation database not found."
    )

    print(
        "Disease detection will still work."
    )
# Load district-wise crop data
district_crop_data = {}

if os.path.exists(DISTRICT_CROP_DATA_PATH):

    try:

        with open(
            DISTRICT_CROP_DATA_PATH,
            "r",
            encoding="utf-8"
        ) as file:

            district_crop_data = json.load(file)

        if not isinstance(
            district_crop_data,
            dict
        ):
            district_crop_data = {}

        print(
            "District crop data loaded: "
            f"{len(district_crop_data)} states"
        )

    except Exception as error:

        print(
            "Could not load district crop "
            f"database: {error}"
        )

        district_crop_data = {}

else:

    print(
        "District crop database not found."
    )


# ============================================================
# FORMAT CLASS NAME
# ============================================================

def format_class_name(class_name):

    if "___" in class_name:

        crop, disease = class_name.split(
            "___",
            1
        )

    else:

        crop = class_name
        disease = "Unknown"

    crop = crop.replace(
        "_",
        " "
    )

    disease = disease.replace(
        "_",
        " "
    )

    return (
        crop.strip().title(),
        disease.strip().title()
    )


# ============================================================
# CONFIDENCE LEVEL
# ============================================================

def get_confidence_level(confidence):

    if confidence >= HIGH_CONFIDENCE:

        return "high"

    elif confidence >= MEDIUM_CONFIDENCE:

        return "medium"

    else:

        return "low"


# ============================================================
# NORMALIZE LIST
# ============================================================

def normalize_list(value):

    if isinstance(value, list):

        return [
            str(item)
            .strip()
            .lower()

            for item in value

            if str(item).strip()
        ]

    if isinstance(value, str):

        return [
            value
            .strip()
            .lower()
        ]

    return []


# ============================================================
# PREDICT ONE IMAGE
# ============================================================

def predict_single_image(image):

    # --------------------------------------------------------
    # Resize
    # --------------------------------------------------------

    image = image.resize(
        IMG_SIZE
    )

    # --------------------------------------------------------
    # Convert to numpy
    # --------------------------------------------------------

    image_array = np.array(
        image,
        dtype=np.float32
    )

    # --------------------------------------------------------
    # Add batch dimension
    # --------------------------------------------------------

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    # --------------------------------------------------------
    # MODEL PREDICTION
    # --------------------------------------------------------

    predictions = model.predict(
        image_array,
        verbose=0
    )[0]

    # --------------------------------------------------------
    # BEST PREDICTION
    # --------------------------------------------------------

    best_index = int(
        np.argmax(predictions)
    )

    best_class = class_names[
        best_index
    ]

    confidence = (
        float(predictions[best_index])
        * 100
    )

    crop, disease = format_class_name(
        best_class
    )

    # --------------------------------------------------------
    # TOP 3
    # --------------------------------------------------------

    top_indices = np.argsort(
        predictions
    )[-3:][::-1]

    top_predictions = []

    for index in top_indices:

        index = int(index)

        class_name = class_names[
            index
        ]

        probability = (
            float(predictions[index])
            * 100
        )

        predicted_crop, predicted_disease = (
            format_class_name(
                class_name
            )
        )

        top_predictions.append({

            "crop":
                predicted_crop,

            "disease":
                predicted_disease,

            "confidence":
                round(
                    probability,
                    2
                )
        })

    # --------------------------------------------------------
    # RESULT
    # --------------------------------------------------------

    return {

        "class_name":
            best_class,

        "crop":
            crop,

        "disease":
            disease,

        "confidence":
            confidence,

        "confidence_level":
            get_confidence_level(
                confidence
            ),

        "top_predictions":
            top_predictions
    }


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {

        "message":
            "AgroVision AI API is running",

        "status":
            "success",

        "version":
            "1.5.0"
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {

        "status":
            "healthy",

        "model_loaded":
            True,

        "number_of_classes":
            len(class_names),

        "disease_database_entries":
            len(disease_info),

        "crop_recommendation_database":
            bool(crop_data)
    }


# ============================================================
# STATE -> DISTRICT DATA
# ============================================================

STATE_DISTRICTS = {

    "Madhya Pradesh": [

        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Maihar",
        "Mandla",
        "Mandsaur",
        "Mauganj",
        "Morena",
        "Narmadapuram",
        "Narsinghpur",
        "Neemuch",
        "Niwari",
        "Pandhurna",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha"
    ],

    "Punjab": [

        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Malerkotla",
        "Mansa",
        "Moga",
        "Pathankot",
        "Patiala",
        "Rupnagar",
        "Sahibzada Ajit Singh Nagar",
        "Sangrur",
        "Shahid Bhagat Singh Nagar",
        "Sri Muktsar Sahib",
        "Tarn Taran"
    ],

    "Haryana": [

        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurugram",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar"
    ],

    "Rajasthan": [

        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Karauli",
        "Kota",
        "Nagaur",
        "Pali",
        "Pratapgarh",
        "Rajsamand",
        "Sawai Madhopur",
        "Sikar",
        "Sirohi",
        "Sri Ganganagar",
        "Tonk",
        "Udaipur"
    ],

    "Uttar Pradesh": [

        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Ayodhya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kasganj",
        "Kaushambi",
        "Kushinagar",
        "Lakhimpur Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Prayagraj",
        "Rae Bareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Sant Kabir Nagar",
        "Shahjahanpur",
        "Shamli",
        "Shravasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi"
    ]
}


# ============================================================
# GET ALL STATES
# ============================================================

@app.get("/states")
def get_states():

    return {

        "success": True,

        "total_states":
            len(STATE_DISTRICTS),

        "states":
            list(
                STATE_DISTRICTS.keys()
            )
    }


# ============================================================
# GET DISTRICTS BY STATE
# ============================================================
@app.get("/districts/{state}")
def get_districts(state: str):

    state = state.strip()

    # First try IISFM API
    try:
        states_data = fetch_iisfm_json(
            f"{IISFM_API_URL}/Revenues"
        )

        state_code = None

        for item in states_data:
            api_state_name = item.get("Name", "").strip()

            if api_state_name.lower() == state.lower():
                state_code = item.get("Code")
                break

        if state_code:
            districts = get_iisfm_districts(state_code)

            if districts:
                return {
                    "success": True,
                    "source": "IISFM",
                    "state": state,
                    "total_districts": len(districts),
                    "districts": districts
                }

    except Exception as e:
        print("IISFM district lookup failed:", e)

    # Fallback to local district data
    districts = STATE_DISTRICTS.get(state)

    if districts is None:
        raise HTTPException(
            status_code=404,
            detail=(
                f"District data is not available "
                f"for {state}."
            )
        )

    return {
        "success": True,
        "source": "local",
        "state": state,
        "total_districts": len(districts),
        "districts": districts
    }


# ============================================================
# PREDICT MULTIPLE IMAGES
# ============================================================

@app.post("/predict")
async def predict(
    files: list[UploadFile] = File(...)
):

    # ========================================================
    # CHECK NUMBER OF IMAGES
    # ========================================================

    if not files:

        raise HTTPException(
            status_code=400,
            detail=(
                "Please upload at least one image."
            )
        )

    if len(files) > MAX_IMAGES:

        raise HTTPException(
            status_code=400,
            detail=(
                "You can upload a maximum "
                "of 3 images."
            )
        )

    # ========================================================
    # ALLOWED FILE TYPES
    # =================@app.get("/districts/{state}")=======================================

    allowed_types = [

        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"
    ]

    # ========================================================
    # STORE INDIVIDUAL RESULTS
    # ========================================================

    individual_results = []

    # ========================================================
    # PROCESS EACH IMAGE
    # ========================================================

    for file in files:

        # ----------------------------------------------------
        # Validate file type
        # ----------------------------------------------------

        if file.content_type not in allowed_types:

            raise HTTPException(
                status_code=400,
                detail=(
                    f"Invalid file type for "
                    f"{file.filename}. "
                    f"Please upload JPG, PNG, "
                    f"or WEBP images."
                )
            )

        # ----------------------------------------------------
        # Read file
        # ----------------------------------------------------

        try:

            contents = await file.read()

            image = Image.open(
                BytesIO(contents)
            ).convert("RGB")

        except Exception:

            raise HTTPException(
                status_code=400,
                detail=(
                    f"Could not read image "
                    f"{file.filename}."
                )
            )

        # ----------------------------------------------------
        # Predict
        # ----------------------------------------------------

        result = predict_single_image(
            image
        )

        # Add filename

        result["filename"] = (
            file.filename
        )

        individual_results.append(
            result
        )

    # ========================================================
    # SINGLE IMAGE
    # ========================================================

    if len(individual_results) == 1:

        final_result = (
            individual_results[0]
        )

    # ========================================================
    # MULTIPLE IMAGE VOTING
    # ========================================================

    else:

        # ----------------------------------------------------
        # Create voting dictionary
        # ----------------------------------------------------

        votes = {}

        for item in individual_results:

            class_name = (
                item["class_name"]
            )

            confidence = (
                item["confidence"]
            )

            if class_name not in votes:

                votes[class_name] = {

                    "count": 0,

                    "confidence_sum": 0.0,

                    "confidences": []
                }

            votes[class_name]["count"] += 1

            votes[class_name][
                "confidence_sum"
            ] += confidence

            votes[class_name][
                "confidences"
            ].append(
                confidence
            )

        # ----------------------------------------------------
        # Weighted voting
        #
        # Priority:
        # 1. Number of votes
        # 2. Average confidence
        # ----------------------------------------------------

        winner_class = max(

            votes.keys(),

            key=lambda cls: (

                votes[cls]["count"],

                votes[cls]["confidence_sum"]
                /
                votes[cls]["count"]
            )
        )

        winner_vote_data = (
            votes[winner_class]
        )

        winner_count = (
            winner_vote_data["count"]
        )

        winner_confidences = (
            winner_vote_data["confidences"]
        )

        # ----------------------------------------------------
        # Average confidence
        # ----------------------------------------------------

        average_confidence = (

            sum(winner_confidences)
            /
            len(winner_confidences)
        )

        # ----------------------------------------------------
        # Agreement ratio
        # ----------------------------------------------------

        agreement_ratio = (

            winner_count
            /
            len(individual_results)
        )

        # ----------------------------------------------------
        # Final confidence
        #
        # 70% model confidence
        # 30% image agreement
        # ----------------------------------------------------

        final_confidence = (

            (average_confidence * 0.70)

            +

            ((agreement_ratio * 100) * 0.30)
        )

        final_confidence = min(

            final_confidence,

            100.0
        )

        # ----------------------------------------------------
        # Winner crop/disease
        # ----------------------------------------------------

        crop, disease = (
            format_class_name(
                winner_class
            )
        )

        # ----------------------------------------------------
        # Final confidence level
        # ----------------------------------------------------

        confidence_level = (
            get_confidence_level(
                final_confidence
            )
        )

        # ----------------------------------------------------
        # Combined top predictions
        # ----------------------------------------------------

        combined_scores = {}

        for item in individual_results:

            for prediction in (
                item["top_predictions"]
            ):

                prediction_class = (

                    prediction["crop"]

                    + "___"

                    + prediction["disease"]
                )

                score = float(
                    prediction["confidence"]
                )

                if prediction_class not in (
                    combined_scores
                ):

                    combined_scores[
                        prediction_class
                    ] = {

                        "crop":
                            prediction["crop"],

                        "disease":
                            prediction["disease"],

                        "score_sum":
                            0.0,

                        "appearances":
                            0
                    }

                combined_scores[
                    prediction_class
                ]["score_sum"] += score

                combined_scores[
                    prediction_class
                ]["appearances"] += 1

        # ----------------------------------------------------
        # Sort combined predictions
        # ----------------------------------------------------

        combined_list = []

        for item in combined_scores.values():

            average_score = (

                item["score_sum"]

                /

                item["appearances"]
            )

            combined_list.append({

                "crop":
                    item["crop"],

                "disease":
                    item["disease"],

                "confidence":
                    round(
                        average_score,
                        2
                    )
            })

        combined_list.sort(

            key=lambda x:
                x["confidence"],

            reverse=True
        )

        top_predictions = (
            combined_list[:3]
        )

        # ----------------------------------------------------
        # Final result
        # ----------------------------------------------------

        final_result = {

            "class_name":
                winner_class,

            "crop":
                crop,

            "disease":
                disease,

            "confidence":
                final_confidence,

            "confidence_level":
                confidence_level,

            "top_predictions":
                top_predictions,

            "vote_count":
                winner_count,

            "total_images":
                len(individual_results),

            "agreement":
                round(
                    agreement_ratio * 100,
                    2
                )
        }

    # ========================================================
    # DISEASE INFORMATION
    # ========================================================

    info = disease_info.get(
        final_result["class_name"]
    )

    # ========================================================
    # DATABASE FALLBACK
    # ========================================================

    if info is None:

        info = {

            "crop":
                final_result["crop"],

            "disease":
                final_result["disease"],

            "controllable":
                None,

            "description":
                (
                    "Information for this "
                    "prediction has not yet "
                    "been added to the database."
                ),

            "symptoms":
                [],

            "management":
                [],

            "treatment_note":
                (
                    "Consult a qualified "
                    "agricultural expert and "
                    "follow current local "
                    "agricultural guidance."
                )
        }

    # ========================================================
    # CONFIDENCE PROTECTION
    # ========================================================

    confidence = float(
        final_result["confidence"]
    )

    # ========================================================
    # VERY LOW CONFIDENCE
    # ========================================================

    if confidence < CONFIDENCE_THRESHOLD:

        return {

            "success":
                True,

            "images_analyzed":
                len(individual_results),

            "prediction":
                None,

            "message":
                (
                    "AI could not reliably "
                    "identify this image set. "
                    "Please upload clear crop "
                    "leaf images."
                ),

            "confidence":
                round(
                    confidence,
                    2
                ),

            "confidence_level":
                "low",

            "top_predictions":
                final_result[
                    "top_predictions"
                ],

            "individual_predictions":
                individual_results
        }

    # ========================================================
    # FINAL DISEASE RESPONSE
    # ========================================================

    response = {

        "success":
            True,

        "images_analyzed":
            len(individual_results),

        "prediction": {

            "crop":
                final_result["crop"],

            "disease":
                final_result["disease"],

            "confidence":
                round(
                    confidence,
                    2
                ),

            "confidence_level":
                final_result[
                    "confidence_level"
                ]
        },

        "disease_information": {

            "controllable":
                info.get(
                    "controllable"
                ),

            "description":
                info.get(
                    "description",
                    ""
                ),

            "symptoms":
                info.get(
                    "symptoms",
                    []
                ),

            "management":
                info.get(
                    "management",
                    []
                ),

            "treatment_note":
                info.get(
                    "treatment_note",
                    ""
                )
        },

        "top_predictions":
            final_result[
                "top_predictions"
            ],

        "individual_predictions": [

            {

                "filename":
                    item["filename"],

                "crop":
                    item["crop"],

                "disease":
                    item["disease"],

                "confidence":
                    round(
                        item["confidence"],
                        2
                    ),

                "confidence_level":
                    item[
                        "confidence_level"
                    ]
            }

            for item
            in individual_results
        ]
    }

    # ========================================================
    # ADD VOTING DETAILS
    # ========================================================

    if len(individual_results) > 1:

        response["voting"] = {

            "winning_votes":
                final_result[
                    "vote_count"
                ],

            "total_images":
                final_result[
                    "total_images"
                ],

            "agreement":
                final_result[
                    "agreement"
                ]
        }

    return response


# ============================================================
# CROP RECOMMENDATION ENGINE
# ============================================================

def get_district_crop_score(
    state,
    district,
    season,
    crop_name
):
    """
    Get district crop evidence score
    from district_crop_data.json.
    """

    state_data = district_crop_data.get(
        state,
        {}
    )

    district_data = state_data.get(
        district,
        {}
    )

    season_data = district_data.get(
        season,
        {}
    )

    return season_data.get(
        crop_name,
        0
    )
@app.post("/recommend-crops")
async def recommend_crops(
    data: dict = Body(...)
):
    """
    Crop Suitability Engine

    Factors:
    - Season
    - Soil type
    - Water availability
    - Rainfall
    - Temperature
    - Location (state + district)

    Important:
    The score is a suitability score, NOT a guarantee
    of crop success or yield.
    """

    # ========================================================
    # CHECK CROP DATABASE
    # ========================================================

    if not crop_data:

        raise HTTPException(
            status_code=503,
            detail=(
                "Crop recommendation database is not available. "
                "Please create data/crop_recommendations.json first."
            )
        )

    # ========================================================
    # READ INPUT
    # ========================================================

    state = str(
        data.get("state", "")
    ).strip()

    district = str(
        data.get("district", "")
    ).strip()

    season = str(
        data.get("season", "")
    ).strip().lower()

    soil_type = str(
        data.get("soil_type", "")
    ).strip().lower()

    water_availability = str(
        data.get("water_availability", "")
    ).strip().lower()

    rainfall = str(
        data.get("rainfall", "")
    ).strip().lower()

    temperature = data.get(
        "temperature"
    )

    # ========================================================
    # REQUIRED INPUT VALIDATION
    # ========================================================

    if not state:

        raise HTTPException(
            status_code=400,
            detail="state is required."
        )

    if not district:

        raise HTTPException(
            status_code=400,
            detail="district is required."
        )

    if not season:

        raise HTTPException(
            status_code=400,
            detail="season is required."
        )

    if not soil_type:

        raise HTTPException(
            status_code=400,
            detail="soil_type is required."
        )

    if not water_availability:

        raise HTTPException(
            status_code=400,
            detail="water_availability is required."
        )

    # ========================================================
    # TEMPERATURE VALIDATION
    # ========================================================

    try:

        temperature = (
            float(temperature)
            if temperature is not None
            else None
        )

    except (TypeError, ValueError):

        raise HTTPException(
            status_code=400,
            detail="temperature must be a number."
        )

    # ========================================================
    # GET CROPS FROM DATABASE
    # ========================================================

    if isinstance(crop_data, dict):

        crops = crop_data.get(
            "crops",
            []
        )

    else:

        crops = crop_data

    if not isinstance(crops, list):

        raise HTTPException(
            status_code=500,
            detail=(
                "Invalid crop recommendation "
                "database format."
            )
        )

    # ========================================================
    # HELPER FUNCTIONS
    # ========================================================

    def normalize_text(value):
        """
        Normalize text for comparison.
        """

        return (
            str(value)
            .strip()
            .lower()
            .replace("-", "_")
            .replace(" ", "_")
        )

    def normalize_list(value):
        """
        Convert a database value into a normalized list.
        """

        if isinstance(value, list):

            return [
                normalize_text(item)
                for item in value
            ]

        if value is None:

            return []

        return [
            normalize_text(value)
        ]

    def exact_match(value, target):
        """
        Check whether target exists in value/list.
        """

        target_normalized = normalize_text(
            target
        )

        values = normalize_list(
            value
        )

        return target_normalized in values

    def calculate_location(crop):
        """
        Calculate location suitability.

        Priority:
        1. Exact district = 15 points
        2. State match = 9 points
        3. No match = 0 points

        Empty location data does NOT create a penalty.
        """

        location = crop.get(
            "location",
            {}
        )

        if not isinstance(location, dict):

            location = {}

        states = normalize_list(
            location.get(
                "states",
                []
            )
        )

        districts = normalize_list(
            location.get(
                "districts",
                []
            )
        )

        input_state = normalize_text(
            state
        )

        input_district = normalize_text(
            district
        )
        

        state_match = (
            input_state in states
            if states
            else False
        )

        district_match = (
            input_district in districts
            if districts
            else False
        )

        data_available = bool(
            states or districts
        )

        location_score = 0

        location_reason = None

        if district_match:

            location_score = 15

            location_reason = (
                "Crop has a location match "
                "for the selected district."
            )

        elif state_match:

            location_score = 0

            location_reason = None

            district_crop_score = get_district_crop_score(
                state,
                district,
                season,
                crop_name

            )
        if district_crop_score > 0:

            location_score =(
                district_crop_score *
                LOCATION_WEIGHT
            )

            location_reason = (
                "District crop evidence found"
                "for the selected district"
            )
        elif data_available:

            location_score = 0

            location_reason = (
                "no verified location match"
                "was found for the selcted area"
            )

        return {

            "data_available":
                data_available,

            "state_match":
                state_match,

            "district_match":
                district_match,

            "location_score":
                location_score,

            "reason":
                location_reason
        }

    # ========================================================
    # SCORING WEIGHTS
    # ========================================================

    SEASON_WEIGHT = 30
    SOIL_WEIGHT = 25
    WATER_WEIGHT = 20
    RAINFALL_WEIGHT = 10
    TEMPERATURE_WEIGHT = 15

    LOCATION_WEIGHT = 15
    DISTRICT_CROP_WEIGHT = 15

    BASE_MAX_SCORE = (
        SEASON_WEIGHT
        + SOIL_WEIGHT
        + WATER_WEIGHT
        + RAINFALL_WEIGHT
        + TEMPERATURE_WEIGHT
    )

    TOTAL_WITH_LOCATION = (
        BASE_MAX_SCORE
        + LOCATION_WEIGHT
    )

    # ========================================================
    # SCORE CROPS
    # ========================================================

    recommendations = []

    for crop in crops:

        if not isinstance(crop, dict):

            continue

        crop_name = crop.get(
            "name",
            "Unknown Crop"
        )

        hindi_name = crop.get(
            "hindi_name",
            ""
        )

        base_score = 0

        reasons = []

        warnings = []

        factor_scores = {}

        # ====================================================
        # 1. SEASON
        # ====================================================

        if exact_match(
            crop.get("seasons"),
            season
        ):

            base_score += SEASON_WEIGHT

            factor_scores["season"] = (
                SEASON_WEIGHT
            )

            reasons.append(
                "Suitable for selected season."
            )

        else:

            factor_scores["season"] = 0

            warnings.append(
                "Selected season is not listed "
                "as a suitable season for this crop."
            )

        # ====================================================
        # 2. SOIL
        # ====================================================

        if exact_match(
            crop.get("soil_types"),
            soil_type
        ):

            base_score += SOIL_WEIGHT

            factor_scores["soil"] = (
                SOIL_WEIGHT
            )

            reasons.append(
                "Suitable for selected soil type."
            )

        else:

            factor_scores["soil"] = 0

            warnings.append(
                "Selected soil type is not listed "
                "as a preferred soil type for this crop."
            )

        # ====================================================
        # 3. WATER
        # ====================================================

        if exact_match(
            crop.get("water_need"),
            water_availability
        ):

            base_score += WATER_WEIGHT

            factor_scores["water"] = (
                WATER_WEIGHT
            )

            reasons.append(
                "Water requirement matches availability."
            )

        else:

            factor_scores["water"] = 0

            warnings.append(
                "Water requirement does not match "
                "the selected water availability."
            )

        # ====================================================
        # 4. RAINFALL
        # ====================================================

        if rainfall:

            if exact_match(
                crop.get("rainfall_need"),
                rainfall
            ):

                base_score += RAINFALL_WEIGHT

                factor_scores["rainfall"] = (
                    RAINFALL_WEIGHT
                )

                reasons.append(
                    "Rainfall requirement matches."
                )

            else:

                factor_scores["rainfall"] = 0

                warnings.append(
                    "Rainfall condition does not "
                    "match the crop's listed requirement."
                )

        else:

            # No rainfall input = don't penalize
            factor_scores["rainfall"] = None

        # ====================================================
        # 5. TEMPERATURE
        # ====================================================

        weather = crop.get(
            "weather",
            {}
        )

        if (
            temperature is not None
            and isinstance(weather, dict)
        ):

            try:

                min_temp = float(
                    weather.get(
                        "min_temperature"
                    )
                )

                max_temp = float(
                    weather.get(
                        "max_temperature"
                    )
                )

                if (
                    min_temp
                    <= temperature
                    <= max_temp
                ):

                    base_score += (
                        TEMPERATURE_WEIGHT
                    )

                    factor_scores["temperature"] = (
                        TEMPERATURE_WEIGHT
                    )

                    reasons.append(
                        "Current temperature is suitable."
                    )

                else:

                    factor_scores["temperature"] = 0

                    warnings.append(
                        "Current temperature is outside "
                        "the crop's listed suitable range."
                    )

            except (
                TypeError,
                ValueError
            ):

                factor_scores["temperature"] = None

        else:

            factor_scores["temperature"] = None

        # ====================================================
        # LOCATION
        # ====================================================

        location_result = calculate_location(
            crop
        )

        location_score = location_result[
            "location_score"
        ]

        location_reason = location_result.get(
            "reason"
        )

        if location_reason:

            if location_score > 0:

                reasons.append(
                    location_reason
                )

            else:

                warnings.append(
                    location_reason
                )

        # ====================================================
        # LOCATION-AWARE FINAL SCORE
        # ====================================================

        if location_result["data_available"]:

            combined_score = (
                base_score
                + location_score
            )

            final_score = (
                combined_score
                / TOTAL_WITH_LOCATION
            ) * 100

        else:

            # If verified location data is not
            # available, don't punish the crop.

            final_score = (
                base_score
                / BASE_MAX_SCORE
            ) * 100

        final_score = max(
            0,
            min(
                final_score,
                100
            )
        )

        # ====================================================
        # SKIP COMPLETELY UNSUITABLE CROP
        # ====================================================

        if base_score <= 0:

            continue

        # ====================================================
        # SUITABILITY CATEGORY
        # ====================================================

        if final_score >= 85:

            suitability = "excellent"

        elif final_score >= 70:

            suitability = "good"

        elif final_score >= 50:

            suitability = "moderate"

        else:

            suitability = "low"

        # ====================================================
        # PREPARE RESULT
        # ====================================================

        recommendations.append({

            "id":
                crop.get("id"),

            "crop":
                crop_name,

            "hindi_name":
                hindi_name,

            "score":
                round(
                    final_score,
                    2
                ),

            "suitability":
                suitability,

            "base_score":
                round(
                    (
                        base_score
                        / BASE_MAX_SCORE
                    ) * 100,
                    2
                ),

            "factor_scores":
                factor_scores,

            "location":
                {

                    "data_available":
                        location_result[
                            "data_available"
                        ],

                    "state_match":
                        location_result[
                            "state_match"
                        ],

                    "district_match":
                        location_result[
                            "district_match"
                        ],

                    "location_score":
                        location_score
                },

            "reasons":
                reasons,

            "warnings":
                warnings,

            "seasons":
                crop.get(
                    "seasons",
                    []
                ),

            "soil_types":
                crop.get(
                    "soil_types",
                    []
                ),

            "water_need":
                crop.get(
                    "water_need",
                    ""
                ),

            "rainfall_need":
                crop.get(
                    "rainfall_need",
                    ""
                ),

            "weather":
                crop.get(
                    "weather",
                    {}
                ),

            "crop_duration_days":
                crop.get(
                    "crop_duration_days",
                    {}
                ),

            "sowing":
                crop.get(
                    "sowing",
                    {}
                ),

            "growth_stages":
                crop.get(
                    "growth_stages",
                    []
                ),

            "management":
                crop.get(
                    "management",
                    {}
                ),

            "harvest":
                crop.get(
                    "harvest",
                    {}
                )
        })

    # ========================================================
    # SORT BY FINAL SUITABILITY
    # ========================================================

    recommendations.sort(
        key=lambda item: (
            item["score"],
            item["location"]["district_match"],
            item["location"]["state_match"]
        ),
        reverse=True
    )

    # ========================================================
    # TOP 5
    # ========================================================

    recommendations = recommendations[:5]

    # ========================================================
    # BEST CROP
    # ========================================================

    best_crop = None

    if recommendations:

        best_crop = recommendations[0]

    # ========================================================
    # RESPONSE
    # ========================================================

    return {

        "success": True,

        "input": {

            "state":
                state,

            "district":
                district,

            "season":
                season,

            "soil_type":
                soil_type,

            "water_availability":
                water_availability,

            "temperature":
                temperature,

            "rainfall":
                rainfall
        },

        "score_explanation": {

            "season_weight":
                SEASON_WEIGHT,

            "soil_weight":
                SOIL_WEIGHT,

            "water_weight":
                WATER_WEIGHT,

            "rainfall_weight":
                RAINFALL_WEIGHT,

            "temperature_weight":
                TEMPERATURE_WEIGHT,

            "location_weight":
                LOCATION_WEIGHT,

            "note":
                (
                    "Suitability score is an analytical "
                    "match score, not a guarantee of yield "
                    "or crop success."
                )
        },

        "best_match":
            best_crop,

        "recommendations":
            recommendations,

        "message":
            (
                "These are preliminary crop suitability "
                "matches. Final farm decisions should also "
                "consider verified local agricultural "
                "advisories, soil-test results, seed/variety "
                "availability, irrigation conditions and "
                "current weather."
            )
    }