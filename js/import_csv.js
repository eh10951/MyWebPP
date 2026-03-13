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
    console.log("Iniciando limpieza de base de datos...");
    const snapshot = await db.collection("pacientes").get();
    
    // Eliminando uno por uno para evitar el límite de 500 del batch
    for (const doc of snapshot.docs) {
        await doc.ref.delete();
    }
    console.log("Base de datos limpia.");

    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    
    console.log("Iniciando importación masiva...");
    let successCount = 0;

    // Agrupar por paciente
    const pacientesAgrupados = {};

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const currentline = lines[i].split(",");
        
        // Mapeo basado en dataset_medico_visuales.csv
        // paciente_id(0),nip(1),nombre(2),edad(3),genero(4),fecha_consulta(5),instancia_medica(6),peso_kg(7),glucosa_mg_dL(8),presion_sistolica(9),presion_diastolica(10),diagnostico(11)
        const id = "PACIENTE_" + currentline[0].padStart(3, '0');
        
        if (!pacientesAgrupados[id]) {
            pacientesAgrupados[id] = {
                nip: currentline[1],
                nombre: currentline[2],
                edad: parseInt(currentline[3]),
                genero: currentline[4],
                // Datos generales o de la última consulta
                peso_kg: parseFloat(currentline[7]),
                glucosa: parseInt(currentline[8]),
                presion: currentline[9] + "/" + currentline[10],
                diagnostico: currentline[11],
                veces_atendido: 0,
                consultas: []
            };
        }

        // Agregar la consulta a su historial
        pacientesAgrupados[id].consultas.push({
            fecha: currentline[5],
            instancia: currentline[6],
            peso_kg: parseFloat(currentline[7]),
            glucosa: parseInt(currentline[8]),
            presion: currentline[9] + "/" + currentline[10],
            diagnostico: currentline[11].trim()
        });
        
        // Actualizamos los datos generales con los de la última consulta (si están en orden)
        // O simplemente incrementamos el contador
        pacientesAgrupados[id].veces_atendido++;
    }

    for (const [id, data] of Object.entries(pacientesAgrupados)) {
        try {
            await db.collection("pacientes").doc(id).set(data);
            successCount++;
            if (successCount % 10 === 0) console.log(`Cargados ${successCount} pacientes...`);
        } catch (error) {
            console.error(`Error en ID ${id}:`, error);
        }
    }

    console.log(`¡IMPORTACIÓN FINALIZADA! Total: ${successCount} pacientes registrados con su historial.`);
    alert(`Se han cargado ${successCount} pacientes (con sus historiales) a la base de datos satisfactoriamente.`);
}

// Para ejecutar esto, pega el contenido del CSV en la variable csvRaw dentro de la consola F12 del portal médico
