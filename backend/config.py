from pathlib import Path


# ============================================================
# PROJECT PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent


MODEL_PATH = (
    BASE_DIR /
    "models" /
    "agrovision_savedmodel"
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


# ============================================================
# IMAGE SETTINGS
# ============================================================

IMG_SIZE = (224, 224)

MAX_IMAGES = 3


# ============================================================
# DISEASE CONFIDENCE SETTINGS
# ============================================================

CONFIDENCE_THRESHOLD = 50.0

HIGH_CONFIDENCE = 70.0

MEDIUM_CONFIDENCE = 50.0


# ============================================================
# CROP RECOMMENDATION SETTINGS
# ============================================================

SEASON_WEIGHT = 30

SOIL_WEIGHT = 25

WATER_WEIGHT = 20

RAINFALL_WEIGHT = 10

TEMPERATURE_WEIGHT = 15

LOCATION_WEIGHT = 15

DISTRICT_CROP_WEIGHT = 15


# ============================================================
# EXTERNAL APIs
# ============================================================

IISFM_API_URL = (
    "https://api.iisfm.nic.in"
)