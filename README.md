# AgroVision AI

The FastAPI backend now serves the supplied Kisan Vision frontend from the same application. Open `/` to reach the site. The API remains available at `/health`, `/predict`, `/recommend-crops`, `/login`, and `/contact`.

## Local setup

Use Python 3.10 or 3.11 for this project because it pins TensorFlow 2.15. Do not reuse the existing `venv` or `.venv` folders if their Python interpreter is missing.

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Fill in the values in `.env`, then start the application:

```powershell
Set-Location backend
uvicorn main:app --reload
```

Visit `http://127.0.0.1:8000/`. The disease detector sends files to `/predict`; crop recommendations use `/recommend-crops`; the login and contact forms use their corresponding API routes.

## Frontend

The supplied site is in `frontend/site`. The previous frontend files remain untouched in `frontend/`.
