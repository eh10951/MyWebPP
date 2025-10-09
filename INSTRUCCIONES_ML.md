# 🚀 Instrucciones para Conectar el Modelo de ML

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- Python 3.7 o superior
- pip (gestor de paquetes de Python)

## 📦 Instalación de Dependencias

Abre una terminal en el directorio del proyecto y ejecuta:

```bash
cd backend
pip install flask flask-cors scikit-learn pandas numpy
```

## ▶️ Iniciar el Servidor Backend

1. **Navega al directorio backend:**
   ```bash
   cd backend
   ```

2. **Ejecuta el servidor Flask:**
   ```bash
   python app.py
   ```

3. **Verifica que el servidor esté funcionando:**
   - Deberías ver un mensaje como: "Running on http://0.0.0.0:5000"
   - El servidor estará disponible en: `http://localhost:5000`

## 🌐 Abrir el Frontend

1. **Abre tu navegador web**

2. **Navega al archivo index.html:**
   - Opción 1: Doble clic en `index.html`
   - Opción 2: Usar un servidor local (recomendado)

### 🛠️ Usar Servidor Local (Recomendado)

Si tienes Python instalado:
```bash
# En el directorio principal del proyecto
python -m http.server 8000
```

Luego abre: `http://localhost:8000`

## 🧪 Probar el Modelo

1. **Desplázate hasta la sección "Modelo de Machine Learning"**

2. **Escribe un comentario en el área de texto**, por ejemplo:
   - "Me encanta estudiar aquí, los profesores son excelentes"
   - "Estoy pensando en dejar la universidad"
   - "Necesito ayuda con matemáticas"

3. **Haz clic en "Analizar Texto"**

4. **Observa los resultados:**
   - Categoría detectada
   - Nivel de confianza
   - Interpretación del modelo
   - Consejo personalizado

## 🔧 Solución de Problemas

### ❌ Error de Conexión
Si ves un error de conexión:

1. **Verifica que el backend esté ejecutándose:**
   ```bash
   cd backend
   python app.py
   ```

2. **Comprueba que el puerto 5000 esté disponible**

3. **Revisa la consola del navegador (F12) para errores**

### 🚫 Error de CORS
Si hay problemas de CORS:
- Asegúrate de que `flask-cors` esté instalado
- Verifica que `CORS(app)` esté en el código del backend

### 📱 Problemas de Responsive
Si la interfaz no se ve bien en móvil:
- Los estilos están optimizados para diferentes tamaños de pantalla
- Prueba refrescando la página

## 🚀 Despliegue en Producción

Para usar en producción:

1. **Cambia la URL en `js/ml-model.js`:**
   ```javascript
   const API_BASE_URL = 'https://tu-dominio-backend.com';
   ```

2. **Despliega el backend en un servicio cloud:**
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

3. **Despliega el frontend en:**
   - Netlify
   - Vercel
   - GitHub Pages

## 📊 Características del Modelo

El modelo puede clasificar texto en estas categorías:

- **🚨 Riesgo de Deserción:** Detecta intención de abandonar estudios
- **💪 Búsqueda de Motivación:** Identifica búsqueda de estrategias de estudio
- **✅ Experiencia Positiva:** Reconoce comentarios positivos
- **📚 Apoyo Académico:** Clasifica consultas sobre materias específicas

## 🛡️ Seguridad

- El modelo procesa texto de forma segura
- No se almacenan datos personales
- Todas las comunicaciones usan HTTPS en producción

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs del servidor backend
2. Comprueba la consola del navegador
3. Verifica que todas las dependencias estén instaladas