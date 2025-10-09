@echo off
echo =========================================
echo   🧪 PROBANDO API PARA RAILWAY (Windows)
echo =========================================
echo.

echo 📦 Instalando dependencias necesarias...
pip install -r requirements.txt

echo.
echo 🚀 Iniciando servidor Flask (simulando Railway)...
echo.
echo ⚠️  NOTA: En Railway se usa gunicorn, pero en Windows usamos Flask directamente
echo    El comportamiento será ligeramente diferente, pero funcional.
echo.

cd backend
echo 🌐 Servidor iniciando en http://localhost:5000
echo 📋 Presiona Ctrl+C para detener
echo.

set FLASK_ENV=production
set PORT=5000
python app.py

echo.
echo ✅ Servidor detenido
pause