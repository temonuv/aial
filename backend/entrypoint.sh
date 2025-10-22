#!/bin/bash
set -e

echo "🚀 Running migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "🚀 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Starting server..."
python manage.py runserver 0.0.0.0:8000

exec "$@"
