#!/bin/bash
set -e

python manage.py migrate
exec gunicorn restaurant-management-backend.wsgi:application --bind 0.0.0.0:8000