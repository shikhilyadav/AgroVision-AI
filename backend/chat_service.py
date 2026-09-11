import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq


# ============================================================
# ENVIRONMENT
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(
    BASE_DIR / ".env"
)


# ============================================================
# GROQ API KEY
# ============================================================

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

if not GROQ_API_KEY:
    raise RuntimeError(
        "GROQ_API_KEY is not configured."
    )


# ============================================================
# GROQ CLIENT
# ============================================================

client = Groq(
    api_key=GROQ_API_KEY
)


# ============================================================
# CHAT FUNCTION
# ============================================================

def chat_with_groq(message):
    """
    Send a user message to Groq
    and return the assistant response.
    """

    if not message or not message.strip():
        raise ValueError(
            "Message cannot be empty."
        )

    response = client.chat.completions.create(
       model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are AgroVision AI, "
                    "a helpful agriculture assistant "
                    "for Indian farmers. "

                    "Give simple, practical and safe "
                    "agriculture advice. "

                    "Prefer Hindi or Hinglish when "
                    "the user asks in Hindi. "

                    "Avoid unnecessarily technical "
                    "language. "

                    "If you are not sure about something, "
                    "clearly say that it should be verified "
                    "with a local agriculture expert."
                )
            },
            {
                "role": "user",
                "content": message.strip()
            }
        ],
        temperature=0.3,
        max_tokens=500
    )

    return response.choices[0].message.content