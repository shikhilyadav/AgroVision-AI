import os
import re

from datetime import datetime, timezone, timedelta

import bcrypt
import jwt

from pymongo.errors import DuplicateKeyError

from database import db


# ============================================================
# USERS COLLECTION
# ============================================================

users_collection = db["users"]


# ============================================================
# JWT CONFIGURATION
# ============================================================

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

if not JWT_SECRET_KEY:
    raise RuntimeError(
        "JWT_SECRET_KEY is not configured."
    )

JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DAYS = 7


# ============================================================
# VALIDATION
# ============================================================

def validate_email(email):

    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    return bool(
        re.match(
            pattern,
            email
        )
    )


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
# CREATE JWT TOKEN
# ============================================================

def create_access_token(user):

    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "name": user["name"],
        "exp": (
            datetime.now(timezone.utc)
            + timedelta(days=JWT_EXPIRATION_DAYS)
        )
    }

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )


# ============================================================
# VERIFY JWT TOKEN
# ============================================================

def verify_access_token(token):

    try:

        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[JWT_ALGORITHM]
        )

        return payload

    except jwt.ExpiredSignatureError:

        raise ValueError(
            "Session has expired. Please login again."
        )

    except jwt.InvalidTokenError:

        raise ValueError(
            "Invalid authentication token."
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

        "password_hash": hash_password(
            password
        ),

        "created_at": datetime.now(
            timezone.utc
        )
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

        "user_id": str(
            result.inserted_id
        )
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
                {
                    "email":
                    identifier.lower()
                },
                {
                    "name":
                    identifier
                }
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

    # --------------------------------------------------------
    # CREATE JWT TOKEN
    # --------------------------------------------------------

    token = create_access_token(
        user
    )

    # --------------------------------------------------------
    # LOGIN RESPONSE
    # --------------------------------------------------------

    return {

        "success": True,

        "message": "Login successful.",

        "token": token,

        "user": {

            "id": str(
                user["_id"]
            ),

            "name": user["name"],

            "email": user["email"],

            "mobile": user["mobile"]
        }
    }