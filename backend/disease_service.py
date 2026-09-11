import json
from io import BytesIO
import numpy as np
import tensorflow as tf
from PIL import Image


from config import (
    MODEL_PATH,
    CLASS_NAMES_PATH,
    DISEASE_INFO_PATH,
    IMG_SIZE,
    MAX_IMAGES,
    CONFIDENCE_THRESHOLD,
    HIGH_CONFIDENCE,
    MEDIUM_CONFIDENCE,
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
    "Disease information entries: "
    f"{len(disease_info)}"
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
# PREDICT MULTIPLE IMAGES
# ============================================================

def predict_multiple_images(
    individual_results
):

    # ========================================================
    # SINGLE IMAGE
    # ========================================================

    if len(individual_results) == 1:

        return individual_results[0]


    # ========================================================
    # CREATE VOTING DICTIONARY
    # ========================================================

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


    # ========================================================
    # WEIGHTED VOTING
    # ========================================================

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


    # ========================================================
    # AVERAGE CONFIDENCE
    # ========================================================

    average_confidence = (

        sum(winner_confidences)
        /
        len(winner_confidences)
    )


    # ========================================================
    # AGREEMENT RATIO
    # ========================================================

    agreement_ratio = (

        winner_count
        /
        len(individual_results)
    )


    # ========================================================
    # FINAL CONFIDENCE
    #
    # 70% model confidence
    # 30% image agreement
    # ========================================================

    final_confidence = (

        (average_confidence * 0.70)

        +

        ((agreement_ratio * 100) * 0.30)
    )


    final_confidence = min(

        final_confidence,

        100.0
    )


    # ========================================================
    # WINNER CROP / DISEASE
    # ========================================================

    crop, disease = (
        format_class_name(
            winner_class
        )
    )


    # ========================================================
    # FINAL CONFIDENCE LEVEL
    # ========================================================

    confidence_level = (
        get_confidence_level(
            final_confidence
        )
    )


    # ========================================================
    # COMBINED TOP PREDICTIONS
    # ========================================================

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


    # ========================================================
    # SORT COMBINED PREDICTIONS
    # ========================================================

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


    # ========================================================
    # FINAL RESULT
    # ========================================================

    return {

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


# ============================================================
# BUILD FINAL PREDICTION RESPONSE
# ============================================================

def build_prediction_response(
    individual_results
):

    # ========================================================
    # FINAL RESULT
    # ========================================================

    final_result = predict_multiple_images(
        individual_results
    )


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
def predict_images(files):
    """
    Process uploaded images and return
    the final disease prediction response.
    """

    if not files:
        raise ValueError(
            "No images uploaded."
        )

    if len(files) > MAX_IMAGES:
        raise ValueError(
            f"Maximum {MAX_IMAGES} images are allowed."
        )

    individual_results = []

    allowed_types = {
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    }

    for file in files:

        if not file.filename:
            continue

        if file.content_type not in allowed_types:
            raise ValueError(
                f"Unsupported image type: {file.filename}"
            )

        image_bytes = file.file.read()

        if not image_bytes:
            raise ValueError(
                f"Empty image file: {file.filename}"
            )

        try:

            image = Image.open(
                BytesIO(image_bytes)
            ).convert("RGB")

        except Exception:

            raise ValueError(
                f"Invalid image file: {file.filename}"
            )

        result = predict_single_image(
            image
        )

        result["filename"] = file.filename

        individual_results.append(
            result
        )

    if not individual_results:
        raise ValueError(
            "No valid images were uploaded."
        )

    return build_prediction_response(
        individual_results
    )