#!/bin/bash
set -e

echo "🚀 Running migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "🚀 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Starting server..."
# Prod: Gunicorn; Dev: runserver
if [ "$DJANGO_ENV" = "production" ]; then
  exec gunicorn --bind 0.0.0.0:8000 --workers 3 --timeout 120 aial.wsgi:application
else
  exec python manage.py runserver 0.0.0.0:8000
fi

exec "$@"
