@echo off
echo ========================================
echo    🤖 INICIANDO MODELO DE ML - UNRC    
echo ========================================
echo.

echo ⏳ Iniciando servidor backend...
cd backend
start "Backend ML" cmd /k "C:\Users\eh109\OneDrive\Escritorio\MyWebPP\.venv\Scripts\python.exe app.py"

echo ⏳ Esperando 3 segundos para que inicie el backend...
timeout /t 3 /nobreak > nul

echo 🌐 Iniciando servidor web para frontend...
cd ..
start "Frontend Web" cmd /k "C:\Users\eh109\OneDrive\Escritorio\MyWebPP\.venv\Scripts\python.exe -m http.server 8000"

echo ⏳ Esperando 2 segundos...
timeout /t 2 /nobreak > nul

echo 🚀 Abriendo navegador web...
start "" "http://localhost:8000"

echo.
echo ✅ Todo listo! Tu aplicación debería abrirse automáticamente
echo.
echo 📋 URLs importantes:
echo    - Frontend: http://localhost:8000
echo    - Backend API: http://localhost:5000
echo.
echo 🛑 Para detener los servidores, cierra las ventanas de comando
echo.
pause