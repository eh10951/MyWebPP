// config.js - Configuración automática de URLs
const CONFIG = {
    // Detectar si estamos en desarrollo o producción
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // URLs base para diferentes entornos
    development: {
        apiUrl: 'http://localhost:5000'
    },
    
    production: {
        // CAMBIA ESTA URL POR TU URL DE RAILWAY
        apiUrl: 'https://tu-proyecto-railway.up.railway.app'
    },
    
    // Función para obtener la URL correcta
    getApiUrl() {
        return this.isDevelopment ? this.development.apiUrl : this.production.apiUrl;
    }
};

// Exportar para uso global
window.CONFIG = CONFIG;