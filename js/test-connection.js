// test-connection.js - Script para probar la conexión con Railway
async function testRailwayConnection() {
    console.log('🔍 Probando conexión con Railway...');
    
    // Detectar entorno
    const isDev = window.location.hostname === 'localhost';
    const apiUrl = isDev ? 'http://localhost:5000' : window.CONFIG?.production?.apiUrl;
    
    console.log(`📍 Entorno: ${isDev ? 'Desarrollo' : 'Producción'}`);
    console.log(`🌐 API URL: ${apiUrl}`);
    
    if (!apiUrl) {
        console.error('❌ No se encontró URL de API configurada');
        return false;
    }
    
    try {
        // Probar endpoint básico
        console.log('📡 Probando endpoint /clasificar...');
        
        const response = await fetch(`${apiUrl}/clasificar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comentario: 'Texto de prueba para verificar conexión'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Conexión exitosa!');
            console.log('📊 Respuesta del servidor:', data);
            return true;
        } else {
            console.error(`❌ Error HTTP: ${response.status} - ${response.statusText}`);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        
        // Diagnóstico adicional
        if (error.message.includes('Failed to fetch')) {
            console.log('💡 Posibles causas:');
            console.log('   - El servidor no está ejecutándose');
            console.log('   - URL incorrecta en la configuración');
            console.log('   - Problema de CORS');
            console.log('   - Sin conexión a internet');
        }
        
        return false;
    }
}

// Función para mostrar estado en la página
function showConnectionStatus(isConnected) {
    const statusDiv = document.createElement('div');
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        ${isConnected 
            ? 'background: linear-gradient(135deg, #00ff99, #00eaff);' 
            : 'background: linear-gradient(135deg, #ff6b6b, #ff8c00);'
        }
    `;
    
    statusDiv.innerHTML = `
        ${isConnected ? '✅' : '❌'} 
        ${isConnected ? 'Conectado a Railway' : 'Sin conexión al servidor'}
    `;
    
    document.body.appendChild(statusDiv);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        statusDiv.remove();
    }, 5000);
}

// Ejecutar prueba automáticamente cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
    // Esperar un poco para que CONFIG se cargue
    setTimeout(async () => {
        const isConnected = await testRailwayConnection();
        showConnectionStatus(isConnected);
    }, 1000);
});

// Exportar para uso manual
window.testRailwayConnection = testRailwayConnection;