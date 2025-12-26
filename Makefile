# Makefile for Django + Postgres backend (Dockerized)
# Usage: `make <target>`

# ---------------------
# VARIABLES
# ---------------------
DOCKER_COMPOSE = docker-compose
SERVICE_API = api
SERVICE_DB = db
PYTHON = python manage.py
REQ_FILE = api/requirements.txt

# ---------------------
# CORE COMMANDS
# ---------------------
# Build containers
build:
	$(DOCKER_COMPOSE) build

# Start containers in background
up:
	$(DOCKER_COMPOSE) up -d

# Stop containers
down:
	$(DOCKER_COMPOSE) down

# View logs (all services)
logs:
	$(DOCKER_COMPOSE) logs -f

# View logs for API
logs-api:
	$(DOCKER_COMPOSE) logs -f $(SERVICE_API)

# View logs for DB
logs-db:
	$(DOCKER_COMPOSE) logs -f $(SERVICE_DB)

# ---------------------
# DJANGO COMMANDS
# ---------------------
# Run Django shell inside API container
shell:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) shell

# Run Django migrations
migrate:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) migrate

# Make migrations for all apps
makemigrations:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) makemigrations

# Run development server directly (rarely needed since docker-compose handles it)
runserver:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) runserver 0.0.0.0:8000

# Create Django superuser
createsuperuser:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) createsuperuser

# ---------------------
# DATABASE COMMANDS
# ---------------------
# Connect to Postgres with psql
psql:
	$(DOCKER_COMPOSE) exec $(SERVICE_DB) psql -U myuser -d mydb

# Reset database completely (drops volume + migrations)
reset-db:
	$(DOCKER_COMPOSE) down -v
	find ./api/bugs/migrations -type f -not -name '__init__.py' -delete
	$(DOCKER_COMPOSE) up -d --build
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) makemigrations
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) migrate

# Inspect database tables
inspectdb:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) inspectdb

# ---------------------
# TESTING & QUALITY
# ---------------------
# Run all Django tests
test:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) $(PYTHON) test

# Lint with flake8 (if added to requirements.txt)
lint:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) flake8 .

# Format code with black
format:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) black .

# ---------------------
# REQUIREMENTS MANAGEMENT
# ---------------------
# Refresh requirements.txt from inside container
refresh-requirements:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) pip freeze > /tmp/requirements.txt
	docker cp $$($(DOCKER_COMPOSE) ps -q $(SERVICE_API)):/tmp/requirements.txt ./api/requirements.txt
	@echo "✅ Updated $(REQ_FILE) with container dependencies."

# Install requirements from requirements.txt inside container
install-requirements:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) pip install -r $(REQ_FILE)
	@echo "✅ Installed dependencies inside container."

# ---------------------
# DEBUGGING HELPERS
# ---------------------
# Rebuild everything from scratch
rebuild:
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) up --build

# Show container status
ps:
	$(DOCKER_COMPOSE) ps

# Open a bash shell inside API container
bash-api:
	$(DOCKER_COMPOSE) exec $(SERVICE_API) bash

# Open a bash shell inside DB container
bash-db:
	$(DOCKER_COMPOSE) exec $(SERVICE_DB) bash
