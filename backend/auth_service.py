import re
from datetime import datetime, timezone

import bcrypt
from pymongo.errors import DuplicateKeyError

from database import db


# ============================================================
# USERS COLLECTION
# ============================================================

users_collection = db["users"]


# ============================================================
# VALIDATION
# ============================================================

def validate_email(email):
    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    return bool(re.match(pattern, email))


def validate_mobile(mobile):
    return bool(
        re.fullmatch(
            r"[6-9]\d{9}",
            mobile
        )
    )


# ============================================================
# PASSWORD HASHING
# ============================================================

def hash_password(password):
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")


def verify_password(password, password_hash):
    return bcrypt.checkpw(
        password.encode("utf-8"),
        password_hash.encode("utf-8")
    )


# ============================================================
# REGISTER USER
# ============================================================

def register_user(
    name,
    mobile,
    email,
    password
):

    name = name.strip()
    mobile = mobile.strip()
    email = email.strip().lower()

    if not name:
        raise ValueError(
            "Name is required."
        )

    if not validate_mobile(mobile):
        raise ValueError(
            "Please enter a valid 10-digit mobile number."
        )

    if not validate_email(email):
        raise ValueError(
            "Please enter a valid email address."
        )

    if len(password) < 8:
        raise ValueError(
            "Password must be at least 8 characters."
        )

    # --------------------------------------------------------
    # CHECK EXISTING USER
    # --------------------------------------------------------

    existing_user = users_collection.find_one(
        {
            "$or": [
                {"email": email},
                {"mobile": mobile}
            ]
        }
    )

    if existing_user:

        if existing_user.get("email") == email:
            raise ValueError(
                "Email is already registered."
            )

        if existing_user.get("mobile") == mobile:
            raise ValueError(
                "Mobile number is already registered."
            )

    # --------------------------------------------------------
    # CREATE USER
    # --------------------------------------------------------

    user = {
        "name": name,
        "mobile": mobile,
        "email": email,
        "password_hash": hash_password(password),
        "created_at": datetime.now(timezone.utc)
    }

    try:

        result = users_collection.insert_one(
            user
        )

    except DuplicateKeyError:

        raise ValueError(
            "Email or mobile number is already registered."
        )

    return {
        "success": True,
        "message": "Registration successful.",
        "user_id": str(result.inserted_id)
    }


# ============================================================
# LOGIN USER
# ============================================================

def login_user(
    identifier,
    password
):

    identifier = identifier.strip()

    if not identifier:
        raise ValueError(
            "Name or email is required."
        )

    if not password:
        raise ValueError(
            "Password is required."
        )

    # --------------------------------------------------------
    # FIND USER BY NAME OR EMAIL
    # --------------------------------------------------------

    user = users_collection.find_one(
        {
            "$or": [
                {"email": identifier.lower()},
                {"name": identifier}
            ]
        }
    )

    if not user:

        raise ValueError(
            "Invalid name/email or password."
        )

    # --------------------------------------------------------
    # VERIFY PASSWORD
    # --------------------------------------------------------

    password_valid = verify_password(
        password,
        user["password_hash"]
    )

    if not password_valid:

        raise ValueError(
            "Invalid name/email or password."
        )

    return {
        "success": True,
        "message": "Login successful.",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "mobile": user["mobile"]
        }
    }