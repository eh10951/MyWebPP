// SCRIPT DE IMPORTACIÓN CSV A FIRESTORE
// Este script lee el CSV y carga los pacientes a la base de datos

const firebaseConfig = {
    projectId: "appbar-1efc0",
    storageBucket: "appbar-1efc0.appspot.com",
};

// Inicializar Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

async function importFromConsole(csvData) {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    
    console.log("Iniciando importación masiva...");
    let successCount = 0;

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const currentline = lines[i].split(",");
        const patientData = {};
        
        // Mapeo manual basado en la estructura observada
        const id = "PACIENTE_" + currentline[0].padStart(3, '0');
        
        patientData.nip = currentline[1];
        patientData.nombre = currentline[2];
        patientData.curp = currentline[3];
        patientData.edad = parseInt(currentline[4]);
        patientData.genero = currentline[5];
        patientData.tipoSangre = currentline[6];
        patientData.antecedentes = currentline[7];
        patientData.alergias = currentline[8];
        patientData.estiloVida = currentline[9];
        patientData.presion = currentline[12];
        patientData.bpm = currentline[13];
        patientData.glucosa = parseInt(currentline[16]);
        patientData.diagnostico = currentline[15];
        patientData.institucion = "S.N.S.";

        try {
            await db.collection("pacientes").doc(id).set(patientData);
            successCount++;
            if (successCount % 10 === 0) console.log(`Cargados ${successCount} pacientes...`);
        } catch (error) {
            console.error(`Error en ID ${id}:`, error);
        }
    }

    console.log(`¡IMPORTACIÓN FINALIZADA! Total: ${successCount} pacientes.`);
    alert(`Se han cargado ${successCount} pacientes a la base de datos satisfactoriamente.\n\nPrueba escaneando el ID del 1 al 29.`);
}

// Para ejecutar esto, pega el contenido del CSV en la variable csvRaw dentro de la consola F12 del portal médico
