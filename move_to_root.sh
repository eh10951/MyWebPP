#!/bin/bash
# Script para mover app.py al directorio raíz si es necesario

echo "Moviendo backend/app.py al directorio raíz..."
mv backend/app.py ./app.py

echo "Actualizando Procfile..."
echo "web: gunicorn app:app --bind 0.0.0.0:\$PORT" > Procfile

echo "¡Listo para Render!"