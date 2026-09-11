import os
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient


# ============================================================
# ENVIRONMENT
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# ============================================================
# MONGODB CONFIGURATION
# ============================================================

MONGODB_URL = os.getenv("MONGODB_URL")

DB_NAME = os.getenv(
    "DB_NAME",
    "kisanvision"
)


if not MONGODB_URL:
    raise RuntimeError(
        "MONGODB_URL is not configured."
    )


# ============================================================
# MONGODB CLIENT
# ============================================================

client = MongoClient(
    MONGODB_URL,
    serverSelectionTimeoutMS=10000
)


# ============================================================
# DATABASE
# ============================================================

db = client[DB_NAME]


# ============================================================
# CONNECTION TEST
# ============================================================

def test_mongodb_connection():

    try:

        client.admin.command("ping")

        print(
            "MongoDB connection successful."
        )

        print(
            "Database:",
            DB_NAME
        )

        return True

    except Exception as error:

        print(
            "MongoDB connection error:",
            error
        )

        return False