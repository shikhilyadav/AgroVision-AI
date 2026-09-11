import json
from pathlib import Path

from config import BASE_DIR


# ============================================================
# DATA SOURCE
# ============================================================

AGRICULTURE_DATA_PATH = (
    BASE_DIR
    / "data"
    / "district_crop_data.json"
)


# ============================================================
# LOAD LOCAL FALLBACK DATA
# ============================================================

def load_district_crop_data():
    """
    Load district-wise crop evidence data.

    This is currently the fallback data source.
    Official government agriculture data can be
    connected here later without changing the
    recommendation engine.
    """

    if not AGRICULTURE_DATA_PATH.exists():
        print(
            "District crop data file not found:",
            AGRICULTURE_DATA_PATH
        )
        return {}

    try:
        with open(
            AGRICULTURE_DATA_PATH,
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)

        if not isinstance(data, dict):
            return {}

        print(
            "Agriculture district crop data loaded:",
            len(data),
            "states"
        )

        return data

    except Exception as error:

        print(
            "Agriculture data loading error:",
            error
        )

        return {}


DISTRICT_CROP_DATA = load_district_crop_data()


# ============================================================
# NORMALIZATION
# ============================================================

def normalize_text(value):
    """
    Normalize text for reliable comparison.
    """

    if value is None:
        return ""

    return (
        str(value)
        .strip()
        .lower()
        .replace("-", "_")
        .replace(" ", "_")
    )


# ============================================================
# FIND KEY
# ============================================================

def find_matching_key(data, target):
    """
    Find a dictionary key using normalized text.
    """

    if not isinstance(data, dict):
        return None

    target_normalized = normalize_text(target)

    for key in data:

        if normalize_text(key) == target_normalized:
            return key

    return None


# ============================================================
# DISTRICT CROP SCORE
# ============================================================

def get_district_crop_score(
    state,
    district,
    season,
    crop_name
):
    """
    Get district-wise crop evidence score.

    Current source:
        district_crop_data.json

    Returns:
        float between 0 and 1
    """

    state_key = find_matching_key(
        DISTRICT_CROP_DATA,
        state
    )

    if not state_key:
        return 0.0

    state_data = DISTRICT_CROP_DATA.get(
        state_key,
        {}
    )

    district_key = find_matching_key(
        state_data,
        district
    )

    if not district_key:
        return 0.0

    district_data = state_data.get(
        district_key,
        {}
    )

    season_key = find_matching_key(
        district_data,
        season
    )

    if not season_key:
        return 0.0

    season_data = district_data.get(
        season_key,
        {}
    )

    crop_key = find_matching_key(
        season_data,
        crop_name
    )

    if not crop_key:
        return 0.0

    try:

        score = float(
            season_data[crop_key]
        )

        return max(
            0.0,
            min(1.0, score)
        )

    except (
        TypeError,
        ValueError
    ):

        return 0.0


# ============================================================
# DATA SOURCE STATUS
# ============================================================

def get_data_source_status():
    """
    Return information about the currently
    active agriculture data source.
    """

    return {
        "source": "local_fallback",
        "source_file": str(
            AGRICULTURE_DATA_PATH
        ),
        "official_api_connected": False,
        "description": (
            "Current district crop evidence "
            "comes from local test data. "
            "Official government APY data "
            "is not connected yet."
        )
    }
# ============================================================
# DISTRICT DATA AVAILABILITY
# ============================================================

def has_district_crop_data(
    state,
    district,
    season
):
    """
    Check whether district-specific crop evidence
    exists for the selected state, district and season.

    Returns:
        True  -> district/season data exists
        False -> verified district data unavailable
    """

    state_key = find_matching_key(
        DISTRICT_CROP_DATA,
        state
    )

    if not state_key:
        return False

    state_data = DISTRICT_CROP_DATA.get(
        state_key,
        {}
    )

    district_key = find_matching_key(
        state_data,
        district
    )

    if not district_key:
        return False

    district_data = state_data.get(
        district_key,
        {}
    )

    season_key = find_matching_key(
        district_data,
        season
    )

    if not season_key:
        return False

    season_data = district_data.get(
        season_key,
        {}
    )

    return bool(season_data)