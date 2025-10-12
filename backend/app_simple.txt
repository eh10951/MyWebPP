from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import random
import logging
import re

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configurar CORS específicamente para producción
if os.environ.get('RAILWAY_ENVIRONMENT'):
    logger.info("Ejecutándose en Railway")
else:
    logger.info("Ejecutándose en desarrollo local")

# Configuración básica - Solo API, no servir frontend
@app.route('/')
def health_check():
    return jsonify({
        "status": "OK", 
        "message": "API del Modelo ML funcionando correctamente (Versión Simplificada)",
        "version": "2.0-simple"
    })

# Modelo simplificado basado en reglas (sin scikit-learn)
def clasificar_texto_simple(texto):
    """
    Clasificador simple basado en reglas sin dependencias de ML
    """
    texto = texto.lower().strip()
    
    # Palabras clave para cada categoría
    palabras_matematicas = ['matematicas', 'algebra', 'geometria', 'calculo', 'ecuacion', 'formula', 'numero']
    palabras_fisica = ['fisica', 'fuerza', 'energia', 'movimiento', 'velocidad', 'newton', 'masa']
    palabras_quimica = ['quimica', 'elemento', 'reaccion', 'molecula', 'atomo', 'laboratorio']
    palabras_programacion = ['programacion', 'codigo', 'python', 'java', 'html', 'css', 'javascript']
    
    palabras_desercion = ['abandonar', 'dejar', 'quiero salir', 'renunciar', 'no aguanto', 'odio estudiar']
    palabras_motivacion = ['motivacion', 'animo', 'desmotivado', 'ayuda', 'apoyo', 'consejo']
    palabras_positivas = ['me gusta', 'me encanta', 'disfruto', 'genial', 'excelente', 'bueno']
    palabras_negativas = ['dificil', 'complicado', 'no entiendo', 'frustrado', 'estresado', 'reprobando']
    
    # Contar coincidencias
    puntos_matematicas = sum(1 for p in palabras_matematicas if p in texto)
    puntos_fisica = sum(1 for p in palabras_fisica if p in texto)
    puntos_quimica = sum(1 for p in palabras_quimica if p in texto)
    puntos_programacion = sum(1 for p in palabras_programacion if p in texto)
    puntos_desercion = sum(1 for p in palabras_desercion if p in texto)
    puntos_positivas = sum(1 for p in palabras_positivas if p in texto)
    puntos_negativas = sum(1 for p in palabras_negativas if p in texto)
    
    # Determinar categoría
    if puntos_desercion > 0:
        return "desercion", 0.9
    elif puntos_matematicas > max(puntos_fisica, puntos_quimica, puntos_programacion):
        return "matematicas", 0.8
    elif puntos_fisica > max(puntos_matematicas, puntos_quimica, puntos_programacion):
        return "fisica", 0.8
    elif puntos_quimica > max(puntos_matematicas, puntos_fisica, puntos_programacion):
        return "quimica", 0.8
    elif puntos_programacion > max(puntos_matematicas, puntos_fisica, puntos_quimica):
        return "programacion", 0.8
    elif puntos_positivas > puntos_negativas:
        return "positivo", 0.7
    elif puntos_negativas > 0:
        return "negativo", 0.7
    else:
        return "motivacion", 0.6

# Consejos por categoría
consejos = {
    "matematicas": [
        "CENTRO DE APOYO MATEMÁTICO: Tutorías gratuitas lunes a viernes 14-18 hrs en Aula 205. También disponible calculadora científica en préstamo.",
        "GRUPO DE ESTUDIO: 'Mates UNRC' se reúne miércoles 16 hrs en Biblioteca Central. Resuelven ejercicios colaborativamente.",
        "PLATAFORMA DIGITAL: Acceso gratuito a 'MathWorks' con ejercicios interactivos. Login con tu matrícula en portal estudiantil."
    ],
    "fisica": [
        "LABORATORIO ABIERTO: Experimentos libres martes y jueves 15-17 hrs. Solicita acceso en Coordinación de Física.",
        "SIMULADORES: Software especializado disponible en Sala de Cómputo B. Incluye PhET y simulaciones 3D.",
        "ASESORÍAS: Profesores disponibles para consultas individuales. Agenda cita en oficina 301 ala norte."
    ],
    "quimica": [
        "CLUB DE QUÍMICA: Experimentos y proyectos creativos viernes 16 hrs en Lab 103. Ambiente relajado y colaborativo.",
        "RECURSOS DIGITALES: Base de datos ChemSketch y tabla periódica interactiva. Acceso desde biblioteca virtual.",
        "PRÁTICAS ADICIONALES: Sesiones de laboratorio los sábados 10 AM. Cupos limitados, inscripción previa."
    ],
    "programacion": [
        "HACKATHON ESTUDIANTIL: Evento mensual primer sábado. Networking, proyectos reales y premios. Todos los niveles bienvenidos.",
        "CODE REVIEW: Sesiones grupales jueves 17 hrs donde comparten y mejoran código entre compañeros.",
        "MENTORÍA TECH: Estudiantes avanzados ofrecen apoyo personalizado. Contacto via Discord 'DevUNRC'."
    ],
    "desercion": [
        "ORIENTACIÓN VOCACIONAL: Cita con psicólogos educativos para explorar alternativas. Oficina Bienestar Estudiantil.",
        "BECA DE APOYO: Programas de asistencia económica y académica. Solicita información en Trabajo Social.",
        "PAUSA ACADÉMICA: Opción de suspensión temporal con garantía de reingreso. Evalúa todas las opciones disponibles."
    ],
    "positivo": [
        "PROGRAMA MENTOR: Comparte tu experiencia positiva ayudando a otros estudiantes como mentor voluntario.",
        "LIDERAZGO: Únete al Consejo Estudiantil o grupos de representación para potenciar tu liderazgo.",
        "PROYECTOS DE IMPACTO: Participa en iniciativas comunitarias vinculadas con tu carrera."
    ],
    "negativo": [
        "BIENESTAR ESTUDIANTIL: Apoyo psicológico gratuito y confidencial. Oficina abierta lunes a viernes 9-17 hrs.",
        "TÉCNICAS DE ESTUDIO: Taller 'Aprender a Aprender' sábados 10 AM. Estrategias personalizadas según tu estilo.",
        "CÍRCULO DE APOYO: Grupo de estudiantes que comparten experiencias similares. Reuniones quincenales."
    ],
    "motivacion": [
        "GESTIÓN DEL TIEMPO: Taller 'Organización Académica Efectiva' del Centro de Desarrollo Estudiantil, sábados 10 AM.",
        "TÉCNICAS DE RELAJACIÓN: App institucional 'Mindfulness UNRC' con meditaciones guiadas de 5-15 min."
    ]
}

@app.route("/clasificar", methods=["POST"])
def clasificar():
    try:
        logger.info("Recibiendo solicitud de clasificación")
        
        # Validar que la solicitud tenga datos JSON
        if not request.is_json:
            logger.error("Solicitud sin JSON válido")
            return jsonify({
                "error": "Content-Type debe ser application/json"
            }), 400
            
        data = request.get_json()
        if not data:
            logger.error("Datos JSON vacíos")
            return jsonify({
                "error": "No se recibieron datos"
            }), 400
            
        # Obtener texto, validar diferentes nombres de campo
        texto = data.get("texto") or data.get("comentario") or data.get("message", "")
        
        if not texto or not texto.strip():
            logger.error("Texto vacío recibido")
            return jsonify({
                "error": "El campo 'texto' es requerido y no puede estar vacío"
            }), 400
            
        texto = texto.lower().strip()
        logger.info(f"Procesando texto: {texto[:50]}...")
        
        # Clasificar usando el modelo simple
        categoria, confianza = clasificar_texto_simple(texto)
        
        # Elegir un consejo según categoría
        consejo = random.choice(consejos.get(categoria, consejos["motivacion"]))
        
        # Respuesta más natural
        respuestas_naturales = {
            "matematicas": "He identificado que requieres orientación en el área de matemáticas.",
            "fisica": "Tu consulta está relacionada con temas de física.",
            "quimica": "Detecto que presentas inquietudes en el ámbito de la química.",
            "programacion": "Reconozco que solicitas apoyo en programación y ciencias computacionales.",
            "desercion": "Percibo que atraviesas una situación crítica y estás considerando la posibilidad de abandonar tus estudios.",
            "motivacion": "Es positivo que busques estrategias para fortalecer tu motivación académica.",
            "positivo": "Es gratificante recibir comentarios constructivos y positivos sobre tu experiencia educativa.",
            "negativo": "Comprendo que enfrentas desafíos académicos que pueden generar estrés o frustración."
        }
        
        respuesta = respuestas_naturales.get(categoria, f"He identificado tu consulta sobre: {categoria}")
        
        result = {
            "respuesta": respuesta,
            "consejo": consejo,
            "categoria": categoria,
            "confianza": f"{confianza:.0%}",
            "status": "success",
            "modelo": "reglas-simples"
        }
        
        logger.info(f"Clasificación exitosa: {categoria}")
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error en clasificación: {str(e)}")
        return jsonify({
            "error": "Error interno del servidor",
            "message": "Ocurrió un error al procesar tu solicitud",
            "respuesta": "He recibido tu consulta académica.",
            "consejo": "Te recomiendo consultar con tu profesor o tutor académico.",
            "status": "error"
        }), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_ENV") == "development"
    
    logger.info(f"Iniciando servidor en puerto {port}")
    logger.info(f"Modo debug: {debug_mode}")
    
    if os.environ.get('RAILWAY_ENVIRONMENT'):
        logger.info("Ejecutándose en Railway - Modo producción")
    else:
        logger.info("Ejecutándose localmente")
    
    app.run(host="0.0.0.0", port=port, debug=debug_mode)