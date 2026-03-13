{
    const firebaseConfigSetup = {
        projectId: "appbar-1efc0",
        storageBucket: "appbar-1efc0.appspot.com",
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfigSetup);
    }
    const db = firebase.firestore();

    const patients = [
        { id: "PACIENTE_001", nip: "6692", nombre: "Alta Gracia Cadena", curp: "NAFX571215MBCDTY01", edad: 19, genero: "Femenino", sangre: "B+", presion: "112/72", bpm: "79 lpm", glucosa: 70, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_002", nip: "2213", nombre: "Marisol Rosa Villegas", curp: "BOVP800326MMSHWD06", edad: 30, genero: "Masculino", sangre: "A+", presion: "128/83", bpm: "66 lpm", glucosa: 85, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_003", nip: "9176", nombre: "Perla Santiago Pelayo", curp: "HALL100504HZSVWJ07", edad: 66, genero: "Masculino", sangre: "AB+", presion: "112/78", bpm: "65 lpm", glucosa: 87, diagnostico: "Check-up anual" },
        { id: "PACIENTE_004", nip: "8949", nombre: "Francisco Tania González Quintana", curp: "SUBG110322MSPLXMA5", edad: 22, genero: "Masculino", sangre: "O+", presion: "111/83", bpm: "76 lpm", glucosa: 101, diagnostico: "Faringitis" },
        { id: "PACIENTE_005", nip: "4603", nombre: "Luis Miguel Cepeda", curp: "ZETP230520HMSHDQ00", edad: 45, genero: "Masculino", sangre: "B+", presion: "128/78", bpm: "67 lpm", glucosa: 73, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_006", nip: "4317", nombre: "Adriana Ballesteros Robledo", curp: "KUYS970115MHGFLW06", edad: 80, genero: "Femenino", sangre: "AB+", presion: "114/80", bpm: "72 lpm", glucosa: 92, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_007", nip: "3825", nombre: "Rodrigo Abril Dávila", curp: "WOLS430601MNTMFX01", edad: 19, genero: "Masculino", sangre: "O+", presion: "129/73", bpm: "61 lpm", glucosa: 98, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_008", nip: "4774", nombre: "Nelly Jonás Moya Valladares", curp: "OEMJ110418MDGYLA00", edad: 85, genero: "Femenino", sangre: "O+", presion: "120/77", bpm: "89 lpm", glucosa: 84, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_009", nip: "8527", nombre: "Cristobal Wendolin Borrego", curp: "OACY320704MNEWQU05", edad: 30, genero: "Femenino", sangre: "A+", presion: "121/84", bpm: "87 lpm", glucosa: 91, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_010", nip: "6759", nombre: "Carlota Margarita Ruiz Zamora", curp: "VAHD651114HQOYYZ01", edad: 75, genero: "Masculino", sangre: "B+", presion: "128/85", bpm: "80 lpm", glucosa: 104, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_011", nip: "1346", nombre: "Tania Arenas", curp: "IUGJ320205MZSJMI04", edad: 69, genero: "Femenino", sangre: "B+", presion: "119/79", bpm: "96 lpm", glucosa: 80, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_012", nip: "5823", nombre: "Paulina Barragán", curp: "KOLT960418MDGFRH08", edad: 84, genero: "Femenino", sangre: "O+", presion: "117/80", bpm: "77 lpm", glucosa: 103, diagnostico: "Faringitis" },
        { id: "PACIENTE_013", nip: "3735", nombre: "Abigail Mares", curp: "LAUR821210MQRWDA04", edad: 62, genero: "Masculino", sangre: "A+", presion: "126/74", bpm: "98 lpm", glucosa: 78, diagnostico: "Check-up anual" },
        { id: "PACIENTE_014", nip: "2192", nombre: "Leonor Cazares Cantú", curp: "RIQP150409HOCKQD04", edad: 19, genero: "Masculino", sangre: "B+", presion: "126/77", bpm: "65 lpm", glucosa: 86, diagnostico: "Faringitis" },
        { id: "PACIENTE_015", nip: "2738", nombre: "Paulina Juana Melgar", curp: "SIWM230822MCSXKTA7", edad: 48, genero: "Femenino", sangre: "O+", presion: "120/77", bpm: "73 lpm", glucosa: 79, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_016", nip: "3274", nombre: "Marisol Silvano Mata", curp: "TUQP220412MTSHGY01", edad: 67, genero: "Femenino", sangre: "B+", presion: "114/72", bpm: "74 lpm", glucosa: 105, diagnostico: "Check-up anual" },
        { id: "PACIENTE_017", nip: "4154", nombre: "Jorge Luis Espartaco Herrera", curp: "AOUD780511MCMXCS01", edad: 65, genero: "Masculino", sangre: "A+", presion: "127/82", bpm: "80 lpm", glucosa: 85, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_018", nip: "9498", nombre: "Sr(a). Felix Cornejo", curp: "DEES421115HSRKQS07", edad: 57, genero: "Masculino", sangre: "A+", presion: "111/85", bpm: "69 lpm", glucosa: 78, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_019", nip: "2016", nombre: "Georgina Débora Ulloa Quintana", curp: "XETL330219MBCDXD06", edad: 73, genero: "Masculino", sangre: "A+", presion: "112/85", bpm: "98 lpm", glucosa: 89, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_020", nip: "9452", nombre: "Nayeli Caballero", curp: "GEGS740719HCSDNQ03", edad: 58, genero: "Masculino", sangre: "A+", presion: "119/77", bpm: "62 lpm", glucosa: 104, diagnostico: "Faringitis" },
        { id: "PACIENTE_021", nip: "2523", nombre: "Rosalia Armando Almaraz Puente", curp: "GIYY390519HGTGFT08", edad: 23, genero: "Femenino", sangre: "B+", presion: "112/72", bpm: "82 lpm", glucosa: 86, diagnostico: "Faringitis" },
        { id: "PACIENTE_022", nip: "9307", nombre: "Frida Paulina Nevárez Berríos", curp: "BOFX030414HBCVXQA6", edad: 85, genero: "Femenino", sangre: "A+", presion: "118/83", bpm: "84 lpm", glucosa: 84, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_023", nip: "6263", nombre: "Micaela Nazario", curp: "NARN020226HMNZKUA0", edad: 32, genero: "Femenino", sangre: "O+", presion: "113/79", bpm: "74 lpm", glucosa: 93, diagnostico: "Faringitis" },
        { id: "PACIENTE_024", nip: "3419", nombre: "Pedro Sandra Mayorga", curp: "FUKC110508MOCWLIA3", edad: 62, genero: "Femenino", sangre: "A+", presion: "117/84", bpm: "100 lpm", glucosa: 85, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_025", nip: "5710", nombre: "Rosalia Adalberto Jaramillo Barraza", curp: "UOZQ450226HGTWPW03", edad: 29, genero: "Femenino", sangre: "B+", presion: "117/77", bpm: "84 lpm", glucosa: 74, diagnostico: "Lumbalgia" },
        { id: "PACIENTE_026", nip: "6644", nombre: "Ing. Ofelia Portillo", curp: "SIMZ890311MCSTZW02", edad: 41, genero: "Femenino", sangre: "AB+", presion: "116/72", bpm: "91 lpm", glucosa: 75, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_027", nip: "2540", nombre: "Marisol Julio César Correa Serrano", curp: "UEKJ041106HJCBNYA7", edad: 19, genero: "Femenino", sangre: "B+", presion: "130/84", bpm: "77 lpm", glucosa: 89, diagnostico: "Control de Diabetes" },
        { id: "PACIENTE_028", nip: "6090", nombre: "Silvano Marisol Carmona Velásquez", curp: "DIIS120526HDGGSV03", edad: 21, genero: "Femenino", sangre: "O+", presion: "124/70", bpm: "76 lpm", glucosa: 93, diagnostico: "Check-up anual" },
        { id: "PACIENTE_029", nip: "5362", nombre: "Mariano Abel Salazar", curp: "MEXC951018HJCQGZ09", edad: 78, genero: "Masculino", sangre: "A+", presion: "123/73", bpm: "93 lpm", glucosa: 79, diagnostico: "Faringitis" }
    ];

    async function runImport() {
        console.log(" Iniciando carga masiva de pacientes...");
        let count = 0;
        
        for (const p of patients) {
            const docId = p.id;
            const data = { 
                nip: p.nip,
                nombre: p.nombre,
                curp: p.curp,
                edad: p.edad,
                genero: p.genero,
                sangre: p.sangre,
                presion: p.presion,
                bpm: p.bpm,
                glucosa: p.glucosa,
                diagnostico: p.diagnostico,
                institucion: "S.N.S.", 
                ultimaSincronizacion: firebase.firestore.FieldValue.serverTimestamp() 
            };

            try {
                await db.collection("pacientes").doc(docId).set(data);
                count++;
                console.log(`[${count}/29] Cargado: ${p.nombre}`);
            } catch (e) {
                console.error("Error cargando a " + p.nombre, e);
            }
        }
        
        if(count > 0) {
            alert(`¡ÉXITO! Se han guardado ${count} pacientes en Firestore.\nYa puedes escanear PACIENTE_001 al PACIENTE_029.`);
        }
    }

    setTimeout(runImport, 1500);
}
