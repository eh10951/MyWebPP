# 🔧 SOLUCIÓN PARA ERROR DE RENDER

## ❌ ERROR:
```
ModuleNotFoundError: No module named 'app'
```

## ✅ SOLUCIONES:

### OPCIÓN 1: Procfile actualizado (YA HECHO)
```
web: cd backend && gunicorn app:app --bind 0.0.0.0:$PORT
```

### OPCIÓN 2: Configuración manual en Render
En el dashboard de Render:
1. **Build Command:** `pip install -r requirements.txt`
2. **Start Command:** `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`

### OPCIÓN 3: Mover archivo (si nada funciona)
```bash
# Ejecutar en terminal:
mv backend/app.py ./app.py
```
Luego cambiar Procfile a:
```
web: gunicorn app:app --bind 0.0.0.0:$PORT
```

### OPCIÓN 4: Usar app_simple (más confiable)
Cambiar Procfile a:
```
web: cd backend && gunicorn app_simple:app --bind 0.0.0.0:$PORT
```

## 🎯 RECOMENDACIÓN:
Primero intenta con OPCIÓN 1 (ya aplicada).
Si falla, usa OPCIÓN 2 en el dashboard de Render.

## 📝 NOTA:
El error es común en servicios de hosting porque Python busca módulos desde el directorio raíz.