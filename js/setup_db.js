// SCRIPT DE IMPORTACIÓN DE PACIENTES DESDE CSV PARA EL PORTAL MÉDICO
// Este script contiene los datos extraídos de base_datos_pacientes.csv
// Se usa el SDK compatible de Firebase (v8 o inferior)

const firebaseConfig = {
    projectId: "appbar-1efc0",
    storageBucket: "appbar-1efc0.appspot.com",
};

// Inicializar Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const patients = [
    { id: 1, nip: "6692", nombre: "Alta  Gracia Cadena", curp: "NAFX571215MBCDTY01", edad: 19, genero: "Femenino", tipoSangre: "B+", presion: "112/72", bpm: "79 lpm", glucosa: "70 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 2, nip: "2213", nombre: "Marisol Rosa Villegas", curp: "BOVP800326MMSHWD06", edad: 30, genero: "Masculino", tipoSangre: "A+", presion: "128/83", bpm: "66 lpm", glucosa: "85 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 3, nip: "9176", nombre: "Perla Santiago Pelayo", curp: "HALL100504HZSVWJ07", edad: 66, genero: "Masculino", tipoSangre: "AB+", presion: "112/78", bpm: "65 lpm", glucosa: "87 mg/dL", diagnostico: "Check-up anual", institucion: "S.N.S." },
    { id: 4, nip: "8949", nombre: "Francisco Tania González Quintana", curp: "SUBG110322MSPLXMA5", edad: 22, genero: "Masculino", tipoSangre: "O+", presion: "111/83", bpm: "76 lpm", glucosa: "101 mg/dL", diagnostico: "Faringitis", institucion: "S.N.S." },
    { id: 5, nip: "4603", nombre: "Luis Miguel Cepeda", curp: "ZETP230520HMSHDQ00", edad: 45, genero: "Masculino", tipoSangre: "B+", presion: "128/78", bpm: "67 lpm", glucosa: "73 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 6, nip: "4317", nombre: "Adriana Ballesteros Robledo", curp: "KUYS970115MHGFLW06", edad: 80, genero: "Femenino", tipoSangre: "AB+", presion: "114/80", bpm: "72 lpm", glucosa: "92 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 7, nip: "3825", nombre: "Rodrigo Abril Dávila", curp: "WOLS430601MNTMFX01", edad: 19, genero: "Masculino", tipoSangre: "O+", presion: "129/73", bpm: "61 lpm", glucosa: "98 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 8, nip: "4774", nombre: "Nelly Jonás Moya Valladares", curp: "OEMJ110418MDGYLA00", edad: 85, genero: "Femenino", tipoSangre: "O+", presion: "120/77", bpm: "89 lpm", glucosa: "84 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 9, nip: "8527", nombre: "Cristobal Wendolin Borrego", curp: "OACY320704MNEWQU05", edad: 30, genero: "Femenino", tipoSangre: "A+", presion: "121/84", bpm: "87 lpm", glucosa: "91 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 10, nip: "6759", nombre: "Carlota Margarita Ruiz Zamora", curp: "VAHD651114HQOYYZ01", edad: 75, genero: "Masculino", tipoSangre: "B+", presion: "128/85", bpm: "80 lpm", glucosa: "104 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 11, nip: "1346", nombre: "Tania Arenas", curp: "IUGJ320205MZSJMI04", edad: 69, genero: "Femenino", tipoSangre: "B+", presion: "119/79", bpm: "96 lpm", glucosa: "80 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 12, nip: "5823", nombre: "Paulina Barragán", curp: "KOLT960418MDGFRH08", edad: 84, genero: "Femenino", tipoSangre: "O+", presion: "117/80", bpm: "77 lpm", glucosa: "103 mg/dL", diagnostico: "Faringitis", institucion: "S.N.S." },
    { id: 13, nip: "3735", nombre: "Abigail Mares", curp: "LAUR821210MQRWDA04", edad: 62, genero: "Masculino", tipoSangre: "A+", presion: "126/74", bpm: "98 lpm", glucosa: "78 mg/dL", diagnostico: "Check-up anual", institucion: "S.N.S." },
    { id: 14, nip: "2192", nombre: "Leonor Cazares Cantú", curp: "RIQP150409HOCKQD04", edad: 19, genero: "Masculino", tipoSangre: "B+", presion: "126/77", bpm: "65 lpm", glucosa: "86 mg/dL", diagnostico: "Faringitis", institucion: "S.N.S." },
    { id: 15, nip: "2738", nombre: "Paulina Juana Melgar", curp: "SIWM230822MCSXKTA7", edad: 48, genero: "Femenino", tipoSangre: "O+", presion: "120/77", bpm: "73 lpm", glucosa: "79 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 16, nip: "3274", nombre: "Marisol Silvano Mata", curp: "TUQP220412MTSHGY01", edad: 67, genero: "Femenino", tipoSangre: "B+", presion: "114/72", bpm: "74 lpm", glucosa: "105 mg/dL", diagnostico: "Check-up anual", institucion: "S.N.S." },
    { id: 17, nip: "4154", nombre: "Jorge Luis Espartaco Herrera", curp: "AOUD780511MCMXCS01", edad: 65, genero: "Masculino", tipoSangre: "A+", presion: "127/82", bpm: "80 lpm", glucosa: "85 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 18, nip: "9498", nombre: "Sr(a). Felix Cornejo", curp: "DEES421115HSRKQS07", edad: 57, genero: "Masculino", tipoSangre: "A+", presion: "111/85", bpm: "69 lpm", glucosa: "78 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 19, nip: "2016", nombre: "Georgina Débora Ulloa Quintana", curp: "XETL330219MBCDXD06", edad: 73, genero: "Masculino", tipoSangre: "A+", presion: "112/85", bpm: "98 lpm", glucosa: "89 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 20, nip: "9452", nombre: "Nayeli Caballero", curp: "GEGS740719HCSDNQ03", edad: 58, genero: "Masculino", tipoSangre: "A+", presion: "119/77", bpm: "62 lpm", glucosa: "104 mg/dL", diagnostico: "Faringitis", institucion: "S.N.S." },
    { id: 21, nip: "2523", nombre: "Rosalia Armando Almaraz Puente", curp: "GIYY390519HGTGFT08", edad: 23, genero: "Femenino", tipoSangre: "B+", presion: "112/72", bpm: "82 lpm", glucosa: "86 mg/dL", diagnostico: "Faringitis", institucion: "S.N.S." },
    { id: 22, nip: "9307", nombre: "Frida Paulina Nevárez Berríos", curp: "BOFX030414HBCVXQA6", edad: 85, genero: "Femenino", tipoSangre: "A+", presion: "118/83", bpm: "84 lpm", glucosa: "84 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 23, nip: "6263", nombre: "Micaela Nazario", curp: "NARN020226HMNZKUA0", edad: 32, genero: "Femenino", tipoSangre: "O+", presion: "113/79", bpm: "74 lpm", glucosa: "93 mg/dL", diagnostico: "Faringitis", institucion: "S.N.S." },
    { id: 24, nip: "3419", nombre: "Pedro Sandra Mayorga", curp: "FUKC110508MOCWLIA3", edad: 62, genero: "Femenino", tipoSangre: "A+", presion: "117/84", bpm: "100 lpm", glucosa: "85 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 25, nip: "5710", nombre: "Rosalia Adalberto Jaramillo Barraza", curp: "UOZQ450226HGTWPW03", edad: 29, genero: "Femenino", tipoSangre: "B+", presion: "117/77", bpm: "84 lpm", glucosa: "74 mg/dL", diagnostico: "Lumbalgia", institucion: "S.N.S." },
    { id: 26, nip: "6644", nombre: "Ing. Ofelia Portillo", curp: "SIMZ890311MCSTZW02", edad: 41, genero: "Femenino", tipoSangre: "AB+", presion: "116/72", bpm: "91 lpm", glucosa: "75 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 27, nip: "2540", nombre: "Marisol Julio César Correa Serrano", curp: "UEKJ041106HJCBNYA7", edad: 19, genero: "Femenino", tipoSangre: "B+", presion: "130/84", bpm: "77 lpm", glucosa: "89 mg/dL", diagnostico: "Control de Diabetes", institucion: "S.N.S." },
    { id: 28, nip: "6090", nombre: "Silvano Marisol Carmona Velásquez", curp: "DIIS120526HDGGSV03", edad: 21, genero: "Femenino", tipoSangre: "O+", presion: "124/70", bpm: "76 lpm", glucosa: "93 mg/dL", diagnostico: "Check-up anual", institucion: "S.N.S." },
    { id: 29, nip: "5362", nombre: "Mariano Abel Salazar", curp: "MEXC951018HJCQGZ09", edad: 78, genero: "Masculino", tipoSangre: "A+", presion: "123/73", bpm: "93 lpm", glucosa: "79 mg/dL", diagnostico: "Faringitis", institucion: "S.N.S." }
];

async function importPatients() {
    console.log("Iniciando importación masiva de pacientes...");
    let successCount = 0;
    let errorCount = 0;

    for (const data of patients) {
        // Formatear ID a 3 dígitos: PACIENTE_001
        const id = `PACIENTE_${data.id.toString().padStart(3, '0')}`;
        
        try {
            await firebase.firestore().collection("pacientes").doc(id).set({
                nip: data.nip,
                nombre: data.nombre,
                curp: data.curp,
                edad: data.edad,
                genero: data.genero,
                tipoSangre: data.tipoSangre,
                presion: data.presion,
                bpm: data.bpm,
                glucosa: data.glucosa,
                diagnostico: data.diagnostico,
                institucion: "S.N.S.",
                ultimaSincronizacion: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log(`✅ Importado: ${docId}`);
            successCount++;
        } catch (error) {
            console.error(`❌ Error en ${docId}:`, error);
            errorCount++;
        }
    }

    console.log(`--- Importación Finalizada ---`);
    console.log(`Éxitos: ${successCount}`);
    console.log(`Errores: ${errorCount}`);
    
    if (errorCount === 0) {
        alert(`¡IMPORTACIÓN EXITOSA!\nSe cargaron ${successCount} registros de pacientes.\nYa puedes usar el portal.`);
    } else {
        alert(`IMPORTACIÓN COMPLETADA CON ERRORES.\nÉxitos: ${successCount}\nErrores: ${errorCount}\nRevisa la consola para más detalles.`);
    }
}

// Iniciar importación
importPatients();
