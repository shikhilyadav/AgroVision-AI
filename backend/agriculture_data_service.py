import csv

from pathlib import Path

from config import BASE_DIR


# ============================================================
# DATA SOURCE
# ============================================================

AGRICULTURE_DATA_PATH = (
    BASE_DIR
    / "district_crop_evidence.csv"
)


# ============================================================
# LOAD DISTRICT CROP EVIDENCE
# ============================================================

def load_district_crop_data():
    """
    Load processed district-wise crop evidence data
    from the CSV dataset.

    The CSV contains historical district, season,
    crop, production, yield, temperature and
    evidence information.
    """

    if not AGRICULTURE_DATA_PATH.exists():
        print(
            "District crop evidence file not found:",
            AGRICULTURE_DATA_PATH
        )
        return []

    try:
        with open(
            AGRICULTURE_DATA_PATH,
            "r",
            encoding="utf-8-sig",
            newline=""
        ) as file:

            reader = csv.DictReader(file)

            data = []

            for row in reader:
                if not row:
                    continue

                data.append(row)

        print(
            "District crop evidence loaded:",
            len(data),
            "records"
        )

        return data

    except Exception as error:
        print(
            "Agriculture data loading error:",
            error
        )

        return []


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
# CROP NAME NORMALIZATION
# ============================================================

def normalize_crop_name(value):
    """
    Normalize crop names between the crop recommendation
    database and the historical district crop dataset.

    Example:
        Soybean -> soyabean
    """

    normalized = normalize_text(value)

    crop_aliases = {
        "soybean": "soyabean"
    }

    return crop_aliases.get(
        normalized,
        normalized
    )


# ============================================================
# FIND DISTRICT CROP RECORD
# ============================================================

def find_crop_record(
    state,
    district,
    season,
    crop_name
):
    """
    Find the historical district crop record
    matching state, district, season and crop.
    """

    state_normalized = normalize_text(
        state
    )

    district_normalized = normalize_text(
        district
    )

    season_normalized = normalize_text(
        season
    )

    crop_normalized = normalize_crop_name(
        crop_name
    )

    for row in DISTRICT_CROP_DATA:

        row_state = normalize_text(
            row.get("State Name")
        )

        row_district = normalize_text(
            row.get("Dist Name")
        )

        row_season = normalize_text(
            row.get("Season")
        )

        row_crop = normalize_crop_name(
            row.get("Crops")
        )

        if (
            row_state == state_normalized
            and
            row_district == district_normalized
            and
            row_season == season_normalized
            and
            row_crop == crop_normalized
        ):
            return row

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
    Get historical district-wise crop evidence score.

    Returns:
        float between 0 and 1

    The score comes from the processed historical
    district crop dataset.
    """

    record = find_crop_record(
        state,
        district,
        season,
        crop_name
    )

    if not record:
        return 0.0

    try:

        score = float(
            record.get(
                "evidence_score",
                0
            )
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
# GET DISTRICT CROP DETAILS
# ============================================================

def get_district_crop_details(
    state,
    district,
    season,
    crop_name
):
    """
    Return complete historical evidence for
    a particular district, season and crop.
    """

    record = find_crop_record(
        state,
        district,
        season,
        crop_name
    )

    if not record:
        return None

    def to_float(value):

        try:
            return float(value)

        except (
            TypeError,
            ValueError
        ):

            return None

    def to_int(value):

        try:
            return int(float(value))

        except (
            TypeError,
            ValueError
        ):

            return None

    return {
        "state": record.get(
            "State Name"
        ),

        "district": record.get(
            "Dist Name"
        ),

        "season": record.get(
            "Season"
        ),

        "crop": record.get(
            "Crops"
        ),

        "observed_years": to_int(
            record.get(
                "observed_years"
            )
        ),

        "first_year": to_int(
            record.get(
                "first_year"
            )
        ),

        "last_year": to_int(
            record.get(
                "last_year"
            )
        ),

        "active_years": to_int(
            record.get(
                "active_years"
            )
        ),

        "mean_area_1000ha": to_float(
            record.get(
                "mean_area_1000ha"
            )
        ),

        "total_area_1000ha": to_float(
            record.get(
                "total_area_1000ha"
            )
        ),

        "mean_production_1000t": to_float(
            record.get(
                "mean_production_1000t"
            )
        ),

        "total_production_1000t": to_float(
            record.get(
                "total_production_1000t"
            )
        ),

        "mean_yield_kg_ha": to_float(
            record.get(
                "mean_yield_kg_ha"
            )
        ),

        "mean_t2m_max": to_float(
            record.get(
                "mean_t2m_max"
            )
        ),

        "area_share": to_float(
            record.get(
                "area_share"
            )
        ),

        "consistency_score": to_float(
            record.get(
                "consistency_score"
            )
        ),

        "evidence_score": to_float(
            record.get(
                "evidence_score"
            )
        )
    }


# ============================================================
# DATA SOURCE STATUS
# ============================================================

def get_data_source_status():
    """
    Return information about the currently
    active agriculture data source.
    """

    return {
        "source": "historical_district_crop_dataset",

        "source_file": str(
            AGRICULTURE_DATA_PATH
        ),

        "official_api_connected": False,

        "description": (
            "Historical district-wise crop evidence "
            "dataset containing crop, season, area, "
            "production, yield and climate information."
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
    Check whether historical district-specific
    crop evidence exists for the selected
    state, district and season.
    """

    state_normalized = normalize_text(
        state
    )

    district_normalized = normalize_text(
        district
    )

    season_normalized = normalize_text(
        season
    )

    for row in DISTRICT_CROP_DATA:

        if (
            normalize_text(
                row.get("State Name")
            )
            ==
            state_normalized
            and
            normalize_text(
                row.get("Dist Name")
            )
            ==
            district_normalized
            and
            normalize_text(
                row.get("Season")
            )
            ==
            season_normalized
        ):
            return True

    return False