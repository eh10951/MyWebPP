@echo off
echo ========================================
echo   🧪 VERIFICADOR DE CONEXION RAILWAY    
echo ========================================
echo.

echo 📋 Verificando archivos necesarios...

if exist "requirements.txt" (
    echo ✅ requirements.txt - OK
) else (
    echo ❌ requirements.txt - FALTA
)

if exist "Procfile" (
    echo ✅ Procfile - OK
) else (
    echo ❌ Procfile - FALTA
)

if exist "railway.json" (
    echo ✅ railway.json - OK
) else (
    echo ❌ railway.json - FALTA
)

if exist "js\config.js" (
    echo ✅ js\config.js - OK
) else (
    echo ❌ js\config.js - FALTA
)

echo.
echo 🔍 Verificando configuración local...

if exist "backend\app.py" (
    echo ✅ Backend app.py encontrado
    findstr /C:"port = int(os.environ.get" backend\app.py >nul
    if !errorlevel! equ 0 (
        echo ✅ Puerto dinámico configurado correctamente
    ) else (
        echo ⚠️  Verificar configuración de puerto
    )
) else (
    echo ❌ Backend app.py no encontrado
)

echo.
echo 📡 Probando servidor local...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5000' -TimeoutSec 3; Write-Host '✅ Servidor local funcionando' } catch { Write-Host '❌ Servidor local no disponible - Ejecuta iniciar_ml.bat primero' }"

echo.
echo 📋 SIGUIENTE PASO:
echo    1. Ejecuta 'iniciar_ml.bat' si el servidor local no funciona
echo    2. Sube tu código a GitHub
echo    3. Despliega en Railway (ver DEPLOY_RAILWAY.md)
echo    4. Actualiza la URL en js/config.js
echo.

pause