# CivicAid

CivicAid is a civic issue-reporting platform that lets citizens report local problems (potholes, broken streetlights, garbage collection issues, etc.) and lets administrators manage, triage, and resolve them efficiently. The backend automatically classifies incoming reports by category and priority using machine learning, and detects duplicate reports before they're even created.

**Live API:** https://civicaid-backend-mwrq.onrender.com
**Frontend repo:** (https://civicaid-sooty.vercel.app/)

---

## Why CivicAid

Most civic-reporting tools rely entirely on manual admin triage every report has to be read, categorized, and prioritized by a human before anything happens. CivicAid removes that bottleneck: reports are automatically tagged by category and urgency the moment they're submitted, and near-duplicate reports (e.g. five people reporting the same pothole) are flagged instead of creating five separate tickets for the same issue.

---

## Key Features

- **JWT authentication** with token blacklisting (SimpleJWT) — secure login/logout with proper token invalidation
- **Role-based access control** — separate permissions and views for Citizens and Admins
- **OTP email verification** — via Brevo's HTTP API instead of SMTP, since Render blocks outbound SMTP ports
- **ML-powered auto-classification** — every report is automatically tagged with a category and priority level at creation time
- **Duplicate detection** — new reports are compared against existing ones using cosine similarity; likely duplicates are flagged instead of silently duplicating tickets
- **Media uploads** — report photos handled via Cloudinary
- **Admin dashboard endpoints** — for reviewing, filtering, and resolving reports

---

## How the ML Pipeline Works

All classification logic lives in `pipeline.py` and runs synchronously inside `perform_create()` when a new report is submitted, so a report is fully classified and duplicate-checked before it's saved.

1. **Text vectorization** — report descriptions are converted to numerical features using **TF-IDF**
2. **Category classification** — a **Multinomial Naive Bayes** classifier predicts the report category (e.g. roads, sanitation, electricity) — **~68% accuracy**
3. **Priority classification** — a second Naive Bayes model predicts urgency (low/medium/high) — **~67% accuracy**
4. **Duplicate detection** — the new report's text is compared against existing open reports using **cosine similarity**; anything scoring above a **0.80 threshold** is flagged as a probable duplicate

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Django, Django REST Framework |
| Auth | JWT (SimpleJWT) with token blacklisting |
| Database | PostgreSQL (hosted on Neon) |
| ML / NLP | scikit-learn (TF-IDF, Multinomial Naive Bayes), cosine similarity |
| Media storage | Cloudinary |
| Email / OTP | Brevo HTTP API |
| Deployment | Render |

---

## Getting Started

### Prerequisites
- Python 3.x
- PostgreSQL (or a Neon database URL)
- Cloudinary account
- Brevo account (for OTP emails)

### Setup

```bash
# Clone the repo
git clone https://github.com/bbinita/civicaid.git
cd civicaid

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables (see below)
cp .env.example .env

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

### Environment Variables

```
SECRET_KEY=
DEBUG=
DATABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
BREVO_API_KEY=
```

---

## API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register/` | POST | Register a new citizen account |
| `/api/auth/verify-otp/` | POST | Verify email via OTP |
| `/api/auth/login/` | POST | Obtain JWT access/refresh tokens |
| `/api/auth/logout/` | POST | Blacklist refresh token |
| `/api/complaints/` | GET, POST | List / create civic issue reports |
| `/api/complaints/<id>/` | GET, PATCH, DELETE | Retrieve, update, or delete a report |


---


## About This Project

CivicAid was built as a final-year capstone project, with this backend developed independently end-to-end API design, authentication, database schema, and the ML classification pipeline.

