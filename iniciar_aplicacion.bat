@echo off
echo ========================================
echo   🚀 INICIANDO APLICACIÓN COMPLETA
echo ========================================
echo.

echo 📱 1. Iniciando BACKEND (Modelo ML)...
cd backend
start "Backend ML - Puerto 5000" cmd /k "python app_simple.py"
cd ..

echo ⏳ Esperando 3 segundos...
timeout /t 3 /nobreak > nul

echo 🌐 2. Iniciando FRONTEND (Servidor Web)...
start "Frontend Web - Puerto 8000" cmd /k "python -m http.server 8000"

echo ⏳ Esperando 2 segundos...
timeout /t 2 /nobreak > nul

echo 🚀 3. Abriendo navegador...
start "" "http://localhost:8000"

echo.
echo ✅ ¡APLICACIÓN INICIADA!
echo.
echo 📋 URLs disponibles:
echo    🌐 Página principal: http://localhost:8000
echo    🤖 API del modelo: http://localhost:5000
echo    📝 Foro ML: http://localhost:8000/foro.html
echo.
echo 🛑 Para detener: Cierra las ventanas de comando
echo.
pause