# Use Python 3.13 slim as base
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential libpq-dev curl netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Install pip deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install debugpy (for VSCode attach)
RUN pip install debugpy

# Copy project files
COPY . .

# Expose ports
EXPOSE 8000 5678

# Default command: run with debugpy + autoreload
CMD ["sh", "-c", "python -m debugpy --listen 0.0.0.0:5678 manage.py runserver 0.0.0.0:8000 --nothreading"]
