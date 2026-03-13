// SCRIPT DE CONFIGURACIÓN DE PACIENTES PARA EL PORTAL MÉDICO
// Ejecuta este script una vez para crear los datos de prueba en tu Firestore

const firebaseConfig = {
    projectId: "appbar-1efc0",
    storageBucket: "appbar-1efc0.appspot.com",
};

// Inicializar Firebase (Asegúrate de tener la librería cargada en el HTML)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

async function setupTestData() {
    console.log("Iniciando carga de datos de prueba...");
    
    try {
        // Creamos al paciente PACIENTE_001 con su NIP 1234
        await db.collection("pacientes").doc("PACIENTE_001").set({
            nombre: "Juan Pérez García",
            edad: 42,
            tipoSangre: "O+",
            glucosa: 115,
            nip: "1234", // ESTE ES EL NIP QUE DEBES INGRESAR
            riesgoDiabetes: "MEDIO",
            ultimaSincronizacion: firebase.firestore.FieldValue.serverTimestamp(),
            institucion: "IMSS"
        });

        console.log("¡ÉXITO! Paciente PACIENTE_001 configurado con NIP: 1234");
        alert("BASE DE DATOS ACTUALIZADA:\nPaciente: PACIENTE_001\nNIP: 1234\n\nYa puedes probar el login en el portal.");
    } catch (error) {
        console.error("Error al configurar Firestore:", error);
        alert("ERROR: No se pudo escribir en Firestore. Revisa las reglas de seguridad.");
    }
}

// Ejecutar la función
setupTestData();
