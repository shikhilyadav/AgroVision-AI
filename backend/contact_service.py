from datetime import datetime, timezone

from database import db


# ============================================================
# CONTACT MESSAGES COLLECTION
# ============================================================

contact_collection = db["contact_messages"]


# ============================================================
# SAVE CONTACT MESSAGE
# ============================================================

def save_contact_message(
    name,
    email,
    message
):
    name = name.strip()
    email = email.strip().lower()
    message = message.strip()

    # --------------------------------------------------------
    # VALIDATION
    # --------------------------------------------------------

    if not name:
        raise ValueError(
            "Name is required."
        )

    if not email:
        raise ValueError(
            "Email is required."
        )

    if not message:
        raise ValueError(
            "Message is required."
        )

    # --------------------------------------------------------
    # CREATE DOCUMENT
    # --------------------------------------------------------

    contact_data = {
        "name": name,
        "email": email,
        "message": message,
        "created_at": datetime.now(timezone.utc)
    }

    # --------------------------------------------------------
    # INSERT INTO MONGODB
    # --------------------------------------------------------

    result = contact_collection.insert_one(
        contact_data
    )

    return {
        "success": True,
        "message": "Your message has been submitted successfully.",
        "message_id": str(result.inserted_id)
    }