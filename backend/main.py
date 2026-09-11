from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException
)
from fastapi.middleware.cors import CORSMiddleware

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
    login_user
)

from contact_service import (
    save_contact_message
)


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
    return {
        "message": "KisanVision API is running"
    }


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
    return get_districts(state)


# ============================================================
# DISEASE PREDICTION
# ============================================================

@app.post("/predict")
async def predict(
    files: list[UploadFile] = File(...)
):
    try:

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

        result = predict_images(files)

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
# CROP RECOMMENDATION
# ============================================================

@app.post("/recommend-crops")
async def recommend_crop_route(
    data: dict
):
    try:

        result = recommend_crops(data)

        return result

    except HTTPException:
        raise

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