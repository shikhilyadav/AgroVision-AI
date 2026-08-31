import os
import json
import numpy as np
import tensorflow as tf

from PIL import Image
from io import BytesIO

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware


# ============================================================
# CONFIGURATION
# ============================================================

MODEL_PATH = "models/agrovision_savedmodel"
CLASS_NAMES_PATH = "models/class_names.json"
DISEASE_INFO_PATH = "data/disease_info.json"

IMG_SIZE = (224, 224)


# ============================================================
# CREATE APP
# ============================================================

app = FastAPI(
    title="AgroVision AI",
    description="AI-powered crop disease detection and management system",
    version="1.1.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# CHECK FILES
# ============================================================

for required_file in [
    MODEL_PATH,
    CLASS_NAMES_PATH,
    DISEASE_INFO_PATH
]:
    if not os.path.exists(required_file):
        raise FileNotFoundError(
            f"Required file not found: {required_file}"
        )


# ============================================================
# LOAD MODEL
# ============================================================

print("Loading AgroVision AI model...")

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
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


print(f"Number of classes: {len(class_names)}")
print(f"Disease information entries: {len(disease_info)}")


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

    crop = crop.replace("_", " ")
    disease = disease.replace("_", " ")

    return (
        crop.strip().title(),
        disease.strip().title()
    )


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "AgroVision AI API is running",
        "status": "success",
        "version": "1.1.0"
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": True,
        "number_of_classes": len(class_names),
        "disease_database_entries": len(disease_info)
    }


# ============================================================
# PREDICT
# ============================================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # --------------------------------------------------------
    # Validate file
    # --------------------------------------------------------

    allowed_types = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"
    ]

    if file.content_type not in allowed_types:

        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG, PNG, or WEBP image."
        )


    # --------------------------------------------------------
    # Read image
    # --------------------------------------------------------

    try:

        contents = await file.read()

        image = Image.open(
            BytesIO(contents)
        ).convert("RGB")

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Could not read uploaded image."
        )


    # --------------------------------------------------------
    # Preprocess
    # --------------------------------------------------------

    image = image.resize(
        IMG_SIZE
    )

    image_array = np.array(
        image,
        dtype=np.float32
    )

    image_array = np.expand_dims(
        image_array,
        axis=0
    )


    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    predictions = model.predict(
        image_array,
        verbose=0
    )[0]


    # --------------------------------------------------------
    # Top 3
    # --------------------------------------------------------

    top_indices = np.argsort(
        predictions
    )[-3:][::-1]


    # --------------------------------------------------------
    # Best prediction
    # --------------------------------------------------------

    best_index = int(
        top_indices[0]
    )

    best_class = class_names[
        best_index
    ]

    confidence = float(
        predictions[best_index]
    ) * 100


    crop, disease = format_class_name(
        best_class
    )


    # --------------------------------------------------------
    # Confidence level
    # --------------------------------------------------------

    if confidence >= 80:

        confidence_level = "high"

    elif confidence >= 60:

        confidence_level = "medium"

    else:

        confidence_level = "low"


    # --------------------------------------------------------
    # Disease information
    # --------------------------------------------------------

    info = disease_info.get(
        best_class
    )


    # If disease is not yet in database

    if info is None:

        info = {

            "crop": crop,

            "disease": disease,

            "controllable": None,

            "description":
                "Information for this prediction "
                "has not yet been added to the database.",

            "symptoms": [],

            "management": [],

            "treatment_note":
                "Consult a qualified agricultural "
                "expert and follow current local "
                "agricultural guidance."
        }


    # --------------------------------------------------------
    # Top 3 predictions
    # --------------------------------------------------------

    top_predictions = []

    for index in top_indices:

        class_name = class_names[
            int(index)
        ]

        probability = float(
            predictions[index]
        ) * 100

        predicted_crop, predicted_disease = (
            format_class_name(
                class_name
            )
        )

        top_predictions.append({

            "crop": predicted_crop,

            "disease": predicted_disease,

            "confidence": round(
                probability,
                2
            )
        })


    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    return {

        "success": True,

        "prediction": {

            "crop": crop,

            "disease": disease,

            "confidence": round(
                confidence,
                2
            ),

            "confidence_level":
                confidence_level
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
            top_predictions
    }