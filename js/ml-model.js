// Configuración de la API
const API_BASE_URL = 'http://localhost:5000'; // Cambia esto por tu URL de producción

// Función principal para analizar texto
async function analyzeText() {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const results = document.getElementById('results');
    
    const texto = textInput.value.trim();
    
    // Validar entrada
    if (!texto) {
        alert('Por favor, ingresa un comentario para analizar.');
        return;
    }
    
    if (texto.length < 10) {
        alert('El comentario debe tener al menos 10 caracteres para un análisis preciso.');
        return;
    }
    
    // Cambiar estado del botón
    analyzeBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    results.style.display = 'none';
    
    try {
        // Realizar petición al backend
        const response = await fetch(`${API_BASE_URL}/clasificar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                texto: texto
            })
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Mostrar resultados
        displayResults(data);
        
    } catch (error) {
        console.error('Error al analizar el texto:', error);
        showError(error.message);
    } finally {
        // Restaurar estado del botón
        analyzeBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// Función para mostrar los resultados
function displayResults(data) {
    const results = document.getElementById('results');
    const categoryElement = document.getElementById('category');
    const confidenceElement = document.getElementById('confidence');
    const interpretationElement = document.getElementById('interpretation');
    const adviceElement = document.getElementById('advice');
    
    // Mapear categorías a nombres más amigables
    const categoryNames = {
        'desercion': 'Riesgo de Deserción',
        'motivacion': 'Búsqueda de Motivación',
        'positivo': 'Experiencia Positiva',
        'negativo': 'Experiencia Negativa',
        'matematicas': 'Apoyo en Matemáticas',
        'fisica': 'Apoyo en Física',
        'quimica': 'Apoyo en Química',
        'programacion': 'Apoyo en Programación'
    };
    
    const categoryName = categoryNames[data.categoria] || data.categoria;
    
    // Actualizar contenido
    categoryElement.textContent = categoryName;
    categoryElement.className = `category-badge ${data.categoria}`;
    
    confidenceElement.textContent = data.confianza || 'N/A';
    
    interpretationElement.textContent = data.respuesta || 'Análisis completado';
    
    adviceElement.textContent = data.consejo || 'No hay consejos disponibles para esta categoría.';
    
    // Mostrar resultados con animación
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Función para mostrar errores
function showError(message) {
    const results = document.getElementById('results');
    const resultContent = results.querySelector('.result-content');
    
    resultContent.innerHTML = `
        <div class="error-message" style="
            background: rgba(220, 53, 69, 0.1);
            color: #dc3545;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid rgba(220, 53, 69, 0.3);
            text-align: center;
        ">
            <h3 style="margin: 0 0 10px 0; color: #dc3545;">❌ Error de Conexión</h3>
            <p style="margin: 0;">
                No se pudo conectar con el modelo de IA. <br>
                <strong>Posibles soluciones:</strong>
            </p>
            <ul style="text-align: left; margin: 15px 0 0 0; padding-left: 20px;">
                <li>Verifica que el servidor backend esté ejecutándose</li>
                <li>Comprueba tu conexión a internet</li>
                <li>Intenta nuevamente en unos momentos</li>
            </ul>
            <p style="margin: 15px 0 0 0; font-size: 0.9em; opacity: 0.8;">
                Error técnico: ${message}
            </p>
        </div>
    `;
    
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Función para permitir análisis con Enter
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    
    if (textInput) {
        textInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                analyzeText();
            }
        });
        
        // Agregar placeholder dinámico
        const placeholders = [
            "Ejemplo: 'Me encanta estudiar aquí, los profesores son excelentes'",
            "Ejemplo: 'Estoy pensando en dejar la universidad porque no entiendo nada'",
            "Ejemplo: 'Necesito ayuda con matemáticas, no entiendo las ecuaciones'",
            "Ejemplo: 'Busco técnicas para estudiar mejor y ser más disciplinado'"
        ];
        
        let placeholderIndex = 0;
        setInterval(() => {
            if (textInput.value === '') {
                textInput.placeholder = placeholders[placeholderIndex];
                placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            }
        }, 3000);
    }
});

// Función para probar la conectividad con el backend
async function testConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/clasificar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texto: "test de conexión"
            })
        });
        
        if (response.ok) {
            console.log('✅ Conexión con el backend establecida correctamente');
            return true;
        } else {
            console.warn('⚠️ El backend responde pero hay un error:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ Error de conexión con el backend:', error);
        return false;
    }
}

// Probar conexión al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Dar tiempo a que la página se cargue completamente
    setTimeout(() => {
        testConnection();
    }, 1000);
});