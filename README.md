
---

# SmashingBugs Monorepo

This repository contains:

* **API (Django + PostgreSQL)** in `api/` (Dockerized)
* **Frontend (React + Vite)** in `ui/` (run natively)

---

## Prerequisites

* **Docker & Docker Compose** (for backend)
* **Node.js 20+ & npm 9+** (for frontend)

---

## Setup Backend (Django + Postgres)

1. Build and start containers:

```bash
docker-compose up --build
```

* API runs on: `http://localhost:8000`
* Postgres (inside container) runs on: `db:5432`
* Postgres mapped to host: `localhost:9220` (to avoid conflicts with local Postgres)

2. If you need to run migrations manually:

```bash
docker-compose run api python manage.py migrate
```

3. Stop containers:

```bash
docker-compose down
```

---

## Setup Frontend (React Vite)

1. Go to the frontend folder:

```bash
cd ui
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

* Frontend runs on: `http://localhost:5173`

> Note: Docker is **not required** for the frontend. Running natively is faster and avoids native module build issues.

---

## Environment Variables

* Backend: use `.env` inside `api/` or set environment variables via Docker. Example:

```
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

* Frontend: `.env` files in `ui/` (e.g., `VITE_API_URL=http://localhost:8000`)

---

## Notes for Collaborators

* **Frontend:** run locally with Node.js

* **Backend:** run inside Docker to ensure consistent Postgres setup

* **Ports:**

  * Django API: `8000`
  * Postgres host port: `9220`
  * React Vite: `5173`

* To reset the database:

```bash
docker-compose down -v
docker-compose up --build
```

---
