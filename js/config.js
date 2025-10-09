// config.js - Configuración automática de URLs
const CONFIG = {
    // Detectar si estamos en desarrollo o producción
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // URLs base para diferentes entornos
    development: {
        apiUrl: 'http://localhost:5000'
    },
    
    production: {
        // ACTUALIZA ESTA URL DESPUÉS DE DESPLEGAR EN RAILWAY
        // Formato: https://tu-proyecto-xxxx.up.railway.app
        apiUrl: 'https://mywebpp-production.up.railway.app'
    },
    
    // Función para obtener la URL correcta
    getApiUrl() {
        const url = this.isDevelopment ? this.development.apiUrl : this.production.apiUrl;
        console.log(`🌐 Usando API URL: ${url} (${this.isDevelopment ? 'desarrollo' : 'producción'})`);
        return url;
    },
    
    // Función para probar conectividad
    async testConnection() {
        const apiUrl = this.getApiUrl();
        try {
            const response = await fetch(`${apiUrl}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Conexión exitosa:', data);
                return true;
            } else {
                console.error(`❌ Error HTTP: ${response.status}`);
                return false;
            }
        } catch (error) {
            console.error('❌ Error de conexión:', error);
            return false;
        }
    }
};

// Exportar para uso global
window.CONFIG = CONFIG;

// Auto-test de conexión al cargar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        CONFIG.testConnection();
    }, 1000);
});