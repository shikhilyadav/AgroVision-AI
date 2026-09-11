import json
from pathlib import Path

from config import BASE_DIR


# --------------------------------------------------
# Agriculture data service
# --------------------------------------------------

AGRICULTURE_DATA_PATH = (
    BASE_DIR
    / "data"
    / "district_crop_data.json"
)


def load_district_crop_data():
    """
    Load district-wise crop evidence data.

    Current file is being used as a temporary
    data source. Later this service can be connected
    to official agriculture/APY data.
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


def get_district_crop_score(
    state,
    district,
    season,
    crop_name
):
    """
    Return district-wise crop evidence score.

    Returns:
        float between 0 and 1
    """

    state_key = None
    district_key = None
    season_key = None
    crop_key = None

    # Find state
    for key in DISTRICT_CROP_DATA:
        if normalize_text(key) == normalize_text(state):
            state_key = key
            break

    if not state_key:
        return 0.0

    # Find district
    state_data = DISTRICT_CROP_DATA[state_key]

    for key in state_data:
        if normalize_text(key) == normalize_text(district):
            district_key = key
            break

    if not district_key:
        return 0.0

    # Find season
    district_data = state_data[district_key]

    for key in district_data:
        if normalize_text(key) == normalize_text(season):
            season_key = key
            break

    if not season_key:
        return 0.0

    # Find crop
    season_data = district_data[season_key]

    for key, score in season_data.items():
        if normalize_text(key) == normalize_text(crop_name):
            try:
                return float(score)
            except (TypeError, ValueError):
                return 0.0

    return 0.0