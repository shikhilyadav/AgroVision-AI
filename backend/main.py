from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException,
    Header
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from datetime import datetime, timezone


# ============================================================
# CONFIG
# ============================================================

from config import (
    BASE_DIR,
    MODEL_PATH,
    CLASS_NAMES_PATH,
    DISEASE_INFO_PATH,
    CROP_DATA_PATH,
    DISTRICT_CROP_DATA_PATH,
    IMG_SIZE,
    MAX_IMAGES,
    CONFIDENCE_THRESHOLD,
    HIGH_CONFIDENCE,
    MEDIUM_CONFIDENCE,
    SEASON_WEIGHT,
    SOIL_WEIGHT,
    WATER_WEIGHT,
    RAINFALL_WEIGHT,
    TEMPERATURE_WEIGHT,
    LOCATION_WEIGHT,
    DISTRICT_CROP_WEIGHT,
    IISFM_API_URL,
)


# ============================================================
# SERVICES
# ============================================================

from location_service import (
    get_states,
    get_districts
)

from disease_service import (
    predict_single_image,
    predict_images
)

from crop_service import (
    recommend_crops
)

from chat_service import (
    chat_with_groq
)

from auth_service import (
    register_user,
    login_user,
    verify_access_token
)

from contact_service import (
    save_contact_message
)


# ============================================================
# DATABASE
# ============================================================

from database import db


# ============================================================
# MONGODB COLLECTIONS
# ============================================================

disease_predictions_collection = db[
    "disease_predictions"
]

crop_recommendation_history_collection = db[
    "crop_recommendation_history"
]


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="KisanVision",
    description=(
        "AI-powered crop disease detection, "
        "crop recommendation and agriculture "
        "assistant API"
    ),
    version="1.0.0"
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
# ROOT
# ============================================================

@app.get("/")
def root():
    """Open the bundled web application."""

    return RedirectResponse(
        url="/windows.html"
    )


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# ============================================================
# STATES
# ============================================================

@app.get("/states")
def states():

    return get_states()


# ============================================================
# DISTRICTS
# ============================================================

@app.get("/districts/{state}")
def districts(state: str):

    return get_districts(
        state
    )


# ============================================================
# DISEASE PREDICTION
# ============================================================

@app.post("/predict")
async def predict(
    files: list[UploadFile] = File(...),
    authorization: str = Header(None)
):

    try:

        # --------------------------------------------------------
        # VERIFY LOGGED-IN USER
        # --------------------------------------------------------

        current_user = get_current_user(
            authorization
        )

        user_id = current_user.get(
            "user_id"
        )

        print(
            "Authenticated prediction user:",
            user_id
        )


        # --------------------------------------------------------
        # VALIDATE FILES
        # --------------------------------------------------------

        if not files:

            raise HTTPException(
                status_code=400,
                detail="No images uploaded."
            )


        if len(files) > MAX_IMAGES:

            raise HTTPException(
                status_code=400,
                detail=(
                    f"Maximum {MAX_IMAGES} "
                    "images are allowed."
                )
            )


        # --------------------------------------------------------
        # RUN AI PREDICTION
        # --------------------------------------------------------

        result = predict_images(
            files
        )


        # --------------------------------------------------------
        # GET MAIN PREDICTION
        # --------------------------------------------------------

        prediction = (
            result.get("prediction")
            or {}
        )


        # --------------------------------------------------------
        # CREATE HISTORY DOCUMENT
        # --------------------------------------------------------

        history_document = {

            # User comes from verified JWT
            "user_id": user_id,

            # Main prediction
            "crop": prediction.get(
                "crop"
            ),

            "disease": prediction.get(
                "disease"
            ),

            "confidence": prediction.get(
                "confidence"
            ),

            "confidence_level": prediction.get(
                "confidence_level"
            ),

            # Top predictions
            "top_predictions": result.get(
                "top_predictions",
                []
            ),

            # Individual predictions
            "individual_predictions": result.get(
                "individual_predictions",
                []
            ),

            # Voting information
            "voting": result.get(
                "voting"
            ),

            # Number of images
            "images_analyzed": len(files),

            # Uploaded filenames
            "filenames": [
                file.filename
                for file in files
            ],

            # UTC timestamp
            "created_at": datetime.now(
                timezone.utc
            )
        }


        # --------------------------------------------------------
        # SAVE HISTORY TO MONGODB
        # --------------------------------------------------------

        try:

            insert_result = (
                disease_predictions_collection.insert_one(
                    history_document
                )
            )

            history_id = str(
                insert_result.inserted_id
            )

            result["history_id"] = history_id

            print(
                "Disease prediction history saved:",
                history_id
            )

        except Exception as db_error:

            # Prediction should still work even if
            # history saving has an issue.

            print(
                "Disease prediction history save error:",
                db_error
            )


        # --------------------------------------------------------
        # RETURN RESULT
        # --------------------------------------------------------

        return result


    except HTTPException:

        raise


    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


    except Exception as error:

        print(
            "Prediction error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred while "
                "processing the images."
            )
        )


# ============================================================
# DISEASE PREDICTION HISTORY
# ============================================================

@app.get("/disease-history")
async def disease_history(
    authorization: str = Header(None)
):

    try:

        # --------------------------------------------------------
        # VERIFY LOGGED-IN USER
        # --------------------------------------------------------

        current_user = get_current_user(
            authorization
        )

        user_id = current_user.get(
            "user_id"
        )

        print(
            "Fetching disease history for user:",
            user_id
        )


        # --------------------------------------------------------
        # GET ONLY THIS USER'S RECORDS
        # --------------------------------------------------------

        history = list(
            disease_predictions_collection.find(
                {
                    "user_id": user_id
                }
            ).sort(
                "created_at",
                -1
            )
        )


        # --------------------------------------------------------
        # FORMAT HISTORY
        # --------------------------------------------------------

        formatted_history = []


        for item in history:

            created_at = item.get(
                "created_at"
            )


            formatted_history.append(
                {
                    "id": str(
                        item.get("_id")
                    ),

                    "crop": item.get(
                        "crop"
                    ),

                    "disease": item.get(
                        "disease"
                    ),

                    "confidence": item.get(
                        "confidence"
                    ),

                    "confidence_level": item.get(
                        "confidence_level"
                    ),

                    "images_analyzed": item.get(
                        "images_analyzed",
                        0
                    ),

                    "filenames": item.get(
                        "filenames",
                        []
                    ),

                    "top_predictions": item.get(
                        "top_predictions",
                        []
                    ),

                    "individual_predictions": item.get(
                        "individual_predictions",
                        []
                    ),

                    "voting": item.get(
                        "voting"
                    ),

                    "created_at": (
                        created_at.isoformat()
                        if created_at
                        else None
                    )
                }
            )


        # --------------------------------------------------------
        # RETURN HISTORY
        # --------------------------------------------------------

        return {
            "success": True,
            "count": len(
                formatted_history
            ),
            "history": formatted_history
        }


    except HTTPException:

        raise


    except Exception as error:

        print(
            "Disease history error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred while "
                "fetching disease history."
            )
        )


# ============================================================
# CROP RECOMMENDATION
# ============================================================

@app.post("/recommend-crops")
async def recommend_crop_route(
    data: dict,
    authorization: str = Header(None)
):

    try:

        # --------------------------------------------------------
        # VERIFY LOGGED-IN USER
        # --------------------------------------------------------

        current_user = get_current_user(
            authorization
        )

        user_id = current_user.get(
            "user_id"
        )

        print(
            "Authenticated crop recommendation user:",
            user_id
        )


        # --------------------------------------------------------
        # RUN EXISTING CROP RECOMMENDATION LOGIC
        # --------------------------------------------------------

        result = recommend_crops(
            data
        )


        # --------------------------------------------------------
        # CREATE CROP RECOMMENDATION HISTORY
        # --------------------------------------------------------

        history_document = {

            # User from verified JWT
            "user_id": user_id,

            # Farmer inputs
            "inputs": {
                "state": data.get(
                    "state"
                ),

                "district": data.get(
                    "district"
                ),

                "season": data.get(
                    "season"
                ),

                "soil_type": data.get(
                    "soil_type"
                ),

                "water_availability": data.get(
                    "water_availability"
                ),

                "temperature": data.get(
                    "temperature"
                ),

                "rainfall": data.get(
                    "rainfall"
                )
            },

            # Complete recommendation result
            "recommendation_result": result,

            # Timestamp
            "created_at": datetime.now(
                timezone.utc
            )
        }


        # --------------------------------------------------------
        # SAVE CROP HISTORY TO MONGODB
        # --------------------------------------------------------

        try:

            insert_result = (
                crop_recommendation_history_collection.insert_one(
                    history_document
                )
            )

            history_id = str(
                insert_result.inserted_id
            )

            print(
                "Crop recommendation history saved:",
                history_id
            )

        except Exception as db_error:

            # Recommendation should still work if
            # history saving fails.

            print(
                "Crop recommendation history save error:",
                db_error
            )


        # --------------------------------------------------------
        # RETURN EXISTING RECOMMENDATION RESULT
        # --------------------------------------------------------

        return result


    except HTTPException:

        raise


    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


    except Exception as error:

        print(
            "Crop recommendation error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred while "
                "generating crop recommendations."
            )
        )


# ============================================================
# CROP RECOMMENDATION HISTORY
# ============================================================

@app.get("/crop-recommendation-history")
async def crop_recommendation_history(
    authorization: str = Header(None)
):

    try:

        # --------------------------------------------------------
        # VERIFY LOGGED-IN USER
        # --------------------------------------------------------

        current_user = get_current_user(
            authorization
        )

        user_id = current_user.get(
            "user_id"
        )

        print(
            "Fetching crop recommendation history for user:",
            user_id
        )


        # --------------------------------------------------------
        # GET ONLY THIS USER'S RECORDS
        # --------------------------------------------------------

        history = list(
            crop_recommendation_history_collection.find(
                {
                    "user_id": user_id
                }
            ).sort(
                "created_at",
                -1
            )
        )


        # --------------------------------------------------------
        # FORMAT HISTORY
        # --------------------------------------------------------

        formatted_history = []


        for item in history:

            created_at = item.get(
                "created_at"
            )


            formatted_history.append(
                {
                    "id": str(
                        item.get("_id")
                    ),

                    "inputs": item.get(
                        "inputs",
                        {}
                    ),

                    "recommendation_result": item.get(
                        "recommendation_result",
                        {}
                    ),

                    "created_at": (
                        created_at.isoformat()
                        if created_at
                        else None
                    )
                }
            )


        # --------------------------------------------------------
        # RETURN HISTORY
        # --------------------------------------------------------

        return {
            "success": True,

            "count": len(
                formatted_history
            ),

            "history": formatted_history
        }


    except HTTPException:

        raise


    except Exception as error:

        print(
            "Crop recommendation history error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred while "
                "fetching crop recommendation history."
            )
        )


# ============================================================
# AGRICULTURE CHATBOT
# ============================================================

@app.post("/chat")
async def chat(
    data: dict
):

    try:

        message = data.get(
            "message",
            ""
        )


        if not message or not message.strip():

            raise HTTPException(
                status_code=400,
                detail="Message cannot be empty."
            )


        reply = chat_with_groq(
            message
        )


        return {
            "success": True,
            "reply": reply
        }


    except HTTPException:

        raise


    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


    except Exception as error:

        print(
            "Chat error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred while "
                "generating the response."
            )
        )


# ============================================================
# USER REGISTRATION
# ============================================================

@app.post("/register")
async def register(
    data: dict
):

    try:

        name = data.get(
            "name",
            ""
        )

        mobile = data.get(
            "mobile",
            ""
        )

        email = data.get(
            "email",
            ""
        )

        password = data.get(
            "password",
            ""
        )


        result = register_user(
            name=name,
            mobile=mobile,
            email=email,
            password=password
        )


        return result


    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


    except Exception as error:

        print(
            "Registration error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred during "
                "registration."
            )
        )


# ============================================================
# USER LOGIN
# ============================================================

@app.post("/login")
async def login(
    data: dict
):

    try:

        identifier = data.get(
            "identifier",
            ""
        )

        password = data.get(
            "password",
            ""
        )


        result = login_user(
            identifier=identifier,
            password=password
        )


        return result


    except ValueError as error:

        raise HTTPException(
            status_code=401,
            detail=str(error)
        )


    except Exception as error:

        print(
            "Login error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred during "
                "login."
            )
        )


# ============================================================
# AUTHENTICATION HELPER
# ============================================================

def get_current_user(
    authorization: str = Header(None)
):

    # --------------------------------------------------------
    # CHECK AUTHORIZATION HEADER
    # --------------------------------------------------------

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Authentication token is required."
        )


    # --------------------------------------------------------
    # CHECK BEARER FORMAT
    # --------------------------------------------------------

    if not authorization.startswith(
        "Bearer "
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication format."
        )


    # --------------------------------------------------------
    # EXTRACT TOKEN
    # --------------------------------------------------------

    token = authorization.replace(
        "Bearer ",
        "",
        1
    ).strip()


    if not token:

        raise HTTPException(
            status_code=401,
            detail="Authentication token is required."
        )


    # --------------------------------------------------------
    # VERIFY TOKEN
    # --------------------------------------------------------

    try:

        payload = verify_access_token(
            token
        )

        return payload


    except ValueError as error:

        raise HTTPException(
            status_code=401,
            detail=str(error)
        )


# ============================================================
# CONTACT FORM
# ============================================================

@app.post("/contact")
async def contact(
    data: dict
):

    try:

        name = data.get(
            "name",
            ""
        )

        email = data.get(
            "email",
            ""
        )

        message = data.get(
            "message",
            ""
        )


        result = save_contact_message(
            name=name,
            email=email,
            message=message
        )


        return result


    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


    except Exception as error:

        print(
            "Contact form error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "An error occurred while "
                "submitting your message."
            )
        )


# ============================================================
# SERVE FRONTEND
# ============================================================

FRONTEND_DIR = BASE_DIR / "frontend" / "site"


if FRONTEND_DIR.is_dir():

    app.mount(
        "/",
        StaticFiles(
            directory=str(FRONTEND_DIR),
            html=True
        ),
        name="frontend"
    )