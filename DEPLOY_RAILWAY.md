# 🚀 INSTRUCCIONES PARA DESPLEGAR EN RAILWAY

## 📋 Paso 1: Preparar tu código
✅ Ya están creados todos los archivos necesarios:
- `requirements.txt` - Dependencias de Python
- `Procfile` - Comando de inicio para Railway
- `railway.json` - Configuración de Railway
- `js/config.js` - Configuración automática de URLs

## 🌐 Paso 2: Desplegar en Railway

### A. Crear cuenta en Railway
1. Ve a [railway.app](https://railway.app)
2. Regístrate con tu cuenta de GitHub

### B. Conectar tu repositorio
1. Haz clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Conecta tu repositorio `MyWebPP`
4. Railway comenzará el despliegue automáticamente

### C. Configurar variables de entorno (si es necesario)
1. En el dashboard de Railway, ve a tu proyecto
2. Haz clic en "Variables"
3. Agrega estas variables si es necesario:
   - `PORT` (Railway lo establece automáticamente)
   - `FLASK_ENV=production`

## 🔧 Paso 3: Obtener tu URL de producción

1. Una vez desplegado, Railway te dará una URL como:
   `https://mywebpp-production-xxxx.up.railway.app`

2. **IMPORTANTE**: Copia esta URL y pégala en `js/config.js` línea 11:
   ```javascript
   production: {
       apiUrl: 'https://tu-url-de-railway.up.railway.app'
   }
   ```

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