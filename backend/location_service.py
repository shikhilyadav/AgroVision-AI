import json
import ssl

from urllib.request import Request, urlopen

from fastapi import HTTPException

from config import IISFM_API_URL


# ============================================================
# IISFM API
# ============================================================

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

    except Exception as error:

        print(
            "IISFM API error:",
            error
        )

        raise HTTPException(
            status_code=502,
            detail="Unable to fetch location data."
        )


# ============================================================
# GET STATES FROM IISFM
# ============================================================

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


# ============================================================
# GET DISTRICTS FROM IISFM
# ============================================================

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

        district_name = item.get(
            "RevDistName"
        )

        if district_name:

            districts.append(
                district_name.strip()
            )

    return districts


# ============================================================
# LOCAL FALLBACK DISTRICTS
# ============================================================

STATE_DISTRICTS = {
    # Hum existing main.py se
    # complete dictionary yahan shift karenge.
}
def get_districts(state: str):
    """
    Get districts for a state.

    First tries IISFM API.
    Local fallback will be added later.
    """

    state = state.strip()

    states_data = fetch_iisfm_json(
        f"{IISFM_API_URL}/Revenues"
    )

    state_code = None

    for item in states_data:

        api_state_name = item.get(
            "Name",
            ""
        ).strip()

        if api_state_name.lower() == state.lower():

            state_code = item.get(
                "Code"
            )

            break

    if not state_code:

        raise HTTPException(
            status_code=404,
            detail=f"State not found: {state}"
        )

    districts = get_iisfm_districts(
        state_code
    )

    if not districts:

        raise HTTPException(
            status_code=404,
            detail=f"Districts not found for {state}"
        )

    return {
        "success": True,
        "source": "IISFM",
        "state": state,
        "total_districts": len(districts),
        "districts": districts
    }