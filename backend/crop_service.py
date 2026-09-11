import json
import os

from fastapi import HTTPException
from agriculture_data_service import (
    get_district_crop_score,
)

from config import (
    CROP_DATA_PATH,
    DISTRICT_CROP_DATA_PATH,
    SEASON_WEIGHT,
    SOIL_WEIGHT,
    WATER_WEIGHT,
    RAINFALL_WEIGHT,
    TEMPERATURE_WEIGHT,
    LOCATION_WEIGHT,
    DISTRICT_CROP_WEIGHT,
)


# ============================================================
# CROP DATABASE
# ============================================================

crop_data = {}

if os.path.exists(CROP_DATA_PATH):

    try:

        with open(
            CROP_DATA_PATH,
            "r",
            encoding="utf-8"
        ) as file:

            crop_data = json.load(file)

        print(
            "Crop recommendation data loaded."
        )

    except Exception as error:

        print(
            "Could not load crop database:",
            error
        )

        crop_data = {}

else:

    print(
        "Crop recommendation database not found."
    )


# ============================================================
# DISTRICT CROP DATABASE
# ============================================================


# ============================================================
# NORMALIZE TEXT
# ============================================================

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


# ============================================================
# NORMALIZE LIST
# ============================================================

def normalize_list(value):
    """
    Convert a database value into
    a normalized list.
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


# ============================================================
# EXACT MATCH
# ============================================================

def exact_match(
    value,
    target
):
    """
    Check whether target exists
    in value/list.
    """

    target_normalized = normalize_text(
        target
    )

    values = normalize_list(
        value
    )

    return target_normalized in values


# ============================================================
# DISTRICT CROP SCORE
# ============================================================



# ============================================================
# LOCATION CALCULATION
# ============================================================

def calculate_location(
    crop,
    state,
    district,
    season,
    crop_name
):
    """
    Calculate location suitability.

    Priority:
    1. Exact district crop evidence
    2. Exact district match
    3. State match
    4. No match

    Empty location data does NOT
    create a direct penalty here.
    The final score handles missing
    location evidence separately.
    """

    location = crop.get(
        "location",
        {}
    )

    if not isinstance(
        location,
        dict
    ):

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

    # --------------------------------------------------------
    # DISTRICT CROP EVIDENCE
    # --------------------------------------------------------

    district_crop_score = (
        get_district_crop_score(
            state,
            district,
            season,
            crop_name
        )
    )

    # Make sure score is numeric
    try:

        district_crop_score = float(
            district_crop_score
        )

    except (
        TypeError,
        ValueError
    ):

        district_crop_score = 0

    # --------------------------------------------------------
    # LOCATION SCORE
    # --------------------------------------------------------

    location_score = 0

    location_reason = None

    # --------------------------------------------------------
    # 1. DISTRICT CROP EVIDENCE
    # --------------------------------------------------------

    if district_crop_score > 0:

        location_score = (
            district_crop_score
            * DISTRICT_CROP_WEIGHT
        )

        location_reason = (
            "District crop evidence found "
            "for the selected district."
        )

    # --------------------------------------------------------
    # 2. EXACT DISTRICT MATCH
    # --------------------------------------------------------

    elif district_match:

        location_score = (
            LOCATION_WEIGHT
        )

        location_reason = (
            "Crop has a location match "
            "for the selected district."
        )

    # --------------------------------------------------------
    # 3. STATE MATCH
    # --------------------------------------------------------

    elif state_match:

        location_score = (
            LOCATION_WEIGHT * 0.60
        )

        location_reason = (
            "Crop is listed as suitable "
            "for the selected state."
        )

    # --------------------------------------------------------
    # 4. LOCATION DATA EXISTS BUT NO MATCH
    # --------------------------------------------------------

    elif data_available:

        location_score = 0

        location_reason = (
            "No verified location match "
            "was found for the selected area."
        )

    return {
        "data_available":
            data_available,

        "state_match":
            state_match,

        "district_match":
            district_match,

        "district_crop_score":
            district_crop_score,

        "location_score":
            location_score,

        "reason":
            location_reason
    }


# ============================================================
# RECOMMEND CROPS
# ============================================================

def recommend_crops(data):
    """
    Crop Suitability Engine.

    Factors:
    - Season
    - Soil type
    - Water availability
    - Rainfall
    - Temperature
    - Location
    - District crop evidence

    The score is a suitability score,
    NOT a guarantee of crop success or yield.
    """

    # ========================================================
    # CHECK CROP DATABASE
    # ========================================================

    if not crop_data:

        raise HTTPException(
            status_code=503,
            detail=(
                "Crop recommendation database "
                "is not available. Please create "
                "data/crop_recommendations.json first."
            )
        )

    # ========================================================
    # READ INPUT
    # ========================================================

    state = str(
        data.get(
            "state",
            ""
        )
    ).strip()

    district = str(
        data.get(
            "district",
            ""
        )
    ).strip()

    season = str(
        data.get(
            "season",
            ""
        )
    ).strip().lower()

    soil_type = str(
        data.get(
            "soil_type",
            ""
        )
    ).strip().lower()

    water_availability = str(
        data.get(
            "water_availability",
            ""
        )
    ).strip().lower()

    rainfall = str(
        data.get(
            "rainfall",
            ""
        )
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
            detail=(
                "water_availability is required."
            )
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

    except (
        TypeError,
        ValueError
    ):

        raise HTTPException(
            status_code=400,
            detail="temperature must be a number."
        )

    # ========================================================
    # GET CROPS FROM DATABASE
    # ========================================================

    if isinstance(
        crop_data,
        dict
    ):

        crops = crop_data.get(
            "crops",
            []
        )

    else:

        crops = crop_data

    if not isinstance(
        crops,
        list
    ):

        raise HTTPException(
            status_code=500,
            detail=(
                "Invalid crop recommendation "
                "database format."
            )
        )

    # ========================================================
    # SCORING WEIGHTS
    # ========================================================

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

        if not isinstance(
            crop,
            dict
        ):

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

            base_score += (
                SEASON_WEIGHT
            )

            factor_scores[
                "season"
            ] = SEASON_WEIGHT

            reasons.append(
                "Suitable for selected season."
            )

        else:

            factor_scores[
                "season"
            ] = 0

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

            base_score += (
                SOIL_WEIGHT
            )

            factor_scores[
                "soil"
            ] = SOIL_WEIGHT

            reasons.append(
                "Suitable for selected soil type."
            )

        else:

            factor_scores[
                "soil"
            ] = 0

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

            base_score += (
                WATER_WEIGHT
            )

            factor_scores[
                "water"
            ] = WATER_WEIGHT

            reasons.append(
                "Water requirement matches availability."
            )

        else:

            factor_scores[
                "water"
            ] = 0

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

                base_score += (
                    RAINFALL_WEIGHT
                )

                factor_scores[
                    "rainfall"
                ] = RAINFALL_WEIGHT

                reasons.append(
                    "Rainfall requirement matches."
                )

            else:

                factor_scores[
                    "rainfall"
                ] = 0

                warnings.append(
                    "Rainfall condition does not "
                    "match the crop's listed requirement."
                )

        else:

            factor_scores[
                "rainfall"
            ] = None

        # ====================================================
        # 5. TEMPERATURE
        # ====================================================

        weather = crop.get(
            "weather",
            {}
        )

        if (
            temperature is not None
            and isinstance(
                weather,
                dict
            )
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

                    factor_scores[
                        "temperature"
                    ] = TEMPERATURE_WEIGHT

                    reasons.append(
                        "Current temperature is suitable."
                    )

                else:

                    factor_scores[
                        "temperature"
                    ] = 0

                    warnings.append(
                        "Current temperature is outside "
                        "the crop's listed suitable range."
                    )

            except (
                TypeError,
                ValueError
            ):

                factor_scores[
                    "temperature"
                ] = None

        else:

            factor_scores[
                "temperature"
            ] = None

        # ====================================================
        # LOCATION
        # ====================================================

        location_result = calculate_location(
            crop,
            state,
            district,
            season,
            crop_name
        )

        location_score = (
            location_result[
                "location_score"
            ]
        )

        location_reason = (
            location_result.get(
                "reason"
            )
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

        if location_result[
            "data_available"
        ]:

            combined_score = (
                base_score
                + location_score
            )

            final_score = (
                combined_score
                / TOTAL_WITH_LOCATION
            ) * 100

        else:

            # ------------------------------------------------
            # No verified location data.
            #
            # Environmental factors may match perfectly,
            # but there is no verified district/state
            # evidence available for this crop.
            #
            # Therefore the score is capped at 85%.
            # ------------------------------------------------

            final_score = (
                base_score
                / BASE_MAX_SCORE
            ) * 85

            warnings.append(
                "District-specific crop evidence "
                "is not available for this crop."
            )

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

        # Crops without verified location evidence
        # should not be labelled "excellent" even when
        # environmental factors match perfectly.

        if not location_result[
            "data_available"
        ]:

            if final_score >= 70:

                suitability = (
                    "limited_evidence"
                )

            elif final_score >= 50:

                suitability = "moderate"

            else:

                suitability = "low"

        elif final_score >= 85:

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

                    "district_crop_score":
                        location_result[
                            "district_crop_score"
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
            item["location"][
                "district_match"
            ],
            item["location"][
                "state_match"
            ]
        ),
        reverse=True
    )

    # ========================================================
    # TOP 5
    # ========================================================

    recommendations = (
        recommendations[:5]
    )

    # ========================================================
    # BEST CROP
    # ========================================================

    best_crop = None

    if recommendations:

        best_crop = (
            recommendations[0]
        )

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

            "district_crop_weight":
                DISTRICT_CROP_WEIGHT,

            "missing_location_max_score":
                85,

            "note":
                (
                    "Suitability score is an analytical "
                    "match score, not a guarantee of yield "
                    "or crop success. Crops without verified "
                    "district evidence are capped at 85% and "
                    "marked as limited_evidence."
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