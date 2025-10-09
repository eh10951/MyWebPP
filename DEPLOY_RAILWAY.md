# 🚀 GUÍA COMPLETA PARA DESPLEGAR EN RAILWAY

## � PROBLEMAS SOLUCIONADOS
✅ **Estructura del proyecto corregida** - Backend como módulo Python
✅ **Procfile actualizado** - Usa `gunicorn backend.app:app` 
✅ **Manejo de errores mejorado** - Logging y validación completa
✅ **CORS configurado** - Para conexión desde cualquier dominio
✅ **Variables de entorno** - Detección automática desarrollo/producción

## 📋 Paso 1: Verificar archivos creados
Los siguientes archivos fueron creados/actualizados:
- ✅ `requirements.txt` - Dependencias flexibles
- ✅ `Procfile` - `gunicorn backend.app:app --bind 0.0.0.0:$PORT`
- ✅ `railway.json` - Configuración simplificada
- ✅ `backend/__init__.py` - Módulo Python
- ✅ `js/config.js` - URLs automáticas
- ✅ `backend/app.py` - Logging y manejo de errores

## 🧪 Paso 2: Probar localmente ANTES de desplegar
```bash
# 1. Ir al directorio del proyecto
cd C:\Users\eh109\OneDrive\Escritorio\MyWebPP

# 2. Instalar dependencias localmente
pip install -r requirements.txt

# 3. Probar con gunicorn (igual que Railway)
gunicorn backend.app:app --bind 0.0.0.0:5000

# 4. Verificar en http://localhost:5000
```

## 🌐 Paso 3: Desplegar en Railway

### A. Preparar repositorio
```bash
# 1. Subir cambios a GitHub
git add .
git commit -m "Configuración completa para Railway"
git push origin main
```

### B. Crear proyecto en Railway
1. Ve a [railway.app](https://railway.app)
2. Regístrate con GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio `MyWebPP`

### C. Railway detectará automáticamente
- ✅ `requirements.txt` → Instalará dependencias
- ✅ `Procfile` → Usará comando correcto
- ✅ Variables PORT automáticas

## 🧪 Paso 4: Probar la conexión

1. Abre tu sitio web local: `http://localhost:8000`
2. Ve a la sección del modelo ML
3. Ingresa un texto de prueba
4. Si funciona, verás que se conecta automáticamente a Railway

## 🔍 Paso 5: Verificar que funciona

### Pruebas locales (desarrollo):
- URL del navegador: `localhost:8000`
- API del modelo: Se conecta a Railway automáticamente

### Pruebas en producción:
- Despliega también tu frontend en:
  - [Netlify](https://netlify.com)
  - [Vercel](https://vercel.com)
  - [GitHub Pages](https://pages.github.com)

## 🚨 Solución de problemas

### Error de conexión:
1. Verifica que Railway esté ejecutándose
2. Revisa los logs en Railway Dashboard
3. Asegúrate de que la URL en `config.js` sea correcta

### Error CORS:
- Ya está configurado `flask-cors` en el backend
- Si persiste, verifica que la URL no tenga barra final `/`

### Error 404:
- Verifica que el endpoint `/clasificar` esté funcionando
- Prueba la API directamente: `https://tu-url.railway.app/clasificar`

## 📱 Comando rápido para probar

```bash
# Probar tu API de Railway directamente
curl -X POST https://tu-url.railway.app/clasificar \
  -H "Content-Type: application/json" \
  -d '{"comentario": "Me siento muy desmotivado con mis estudios"}'
```

## ✅ ¡Todo listo!
Una vez que actualices la URL en `config.js`, tu modelo ML funcionará automáticamente tanto en desarrollo como en producción.