// medical_logic.js - Firebase & Scanner Control
const firebaseConfig = {
    projectId: "appbar-1efc0",
    storageBucket: "appbar-1efc0.appspot.com",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let html5QrScanner = null;
let currentNip = "";
let scannedPatientID = null;

// Login Simulado
document.getElementById('medical-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showScreen('scanner-screen');
    startScanner();
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startScanner() {
    if(!html5QrScanner) {
        html5QrScanner = new Html5Qrcode("reader");
    }
    
    // Configuración para que el video llene el área y el cuadro sea vertical
    const config = { 
        fps: 32, 
        qrbox: { width: 320, height: 450 }, // Coincide con el overlay del CSS
        aspectRatio: 1.0, // Forzado para centrar en el contenedor
        videoConstraints: {
            facingMode: "environment",
            aspectRatio: { ideal: 0.7 } // Solicita modo retrato a la cámara
        }
    };

    html5QrScanner.start(
        { facingMode: "environment" }, 
        config,
        onScanSuccess
    ).then(() => {
        // Ajuste adicional post-inicio para forzar el redimensionamiento del video
        const video = document.querySelector("#reader video");
        if(video) {
            video.style.objectFit = "cover";
        }
    }).catch(err => console.error("Error scanner:", err));
}

function onScanSuccess(decodedText) {
    scannedPatientID = decodedText;
    document.getElementById('scan-status-text').innerText = "QR DETECTADO: " + decodedText;
    document.querySelector('.scanner-overlay').style.borderColor = "#10b981";
}

// Lógica del NIP Digital
window.addNip = function(num) {
    if(currentNip.length < 4) {
        currentNip += num;
        document.getElementById('nip-input').value = currentNip;
    }
};

window.clearNip = function() {
    currentNip = "";
    document.getElementById('nip-input').value = "";
};

window.verifyNip = async function() {
    if(!scannedPatientID) {
        alert("Primero escanee el código QR del paciente");
        return;
    }
    if(currentNip.length < 4) return;

    // --- MODO PRUEBA LIBRE ACTIVO ---
    console.warn("MODO PRUEBA: Aceptando cualquier NIP para " + scannedPatientID);
    
    try {
        const doc = await db.collection("pacientes").doc(scannedPatientID).get();
        if(doc.exists) {
            const data = doc.data();
            // Verificación real del NIP del CSV
            if(data.nip === currentNip) {
                if(html5QrScanner) html5QrScanner.stop();
                showDashboard(data);
            } else {
                alert("NIP INCORRECTO. Intente de nuevo.");
                clearNip();
            }
        } else {
            alert("PACIENTE NO ENCONTRADO EN LA BASE DE DATOS.");
            clearNip();
        }
    } catch(err) {
        console.error("Error en conexión, cargando DEMO:", err);
        showDashboard({
            nombre: "Error de Red (Offline Demo)",
            edad: "--",
            tipoSangre: "O+",
            glucosa: "110",
            riesgoDiabetes: "DESCONOCIDO"
        });
    }
};

function showDashboard(data) {
    showScreen('dashboard-screen');
    document.getElementById('patient-name-display').innerText = data.nombre || "N/A";
    document.getElementById('p-id').innerText = scannedPatientID || "PACIENTE_0XX";
    document.getElementById('p-age').innerText = (data.edad || "--") + " AÑOS";
    document.getElementById('p-gender').innerText = data.genero || "N/A";
    document.getElementById('p-curp').innerText = data.curp || "N/A";
    document.getElementById('p-blood').innerText = data.sangre || data.tipoSangre || "N/A";
    document.getElementById('p-glucose').innerText = (data.glucosa || "0") + " mg/dL";
    document.getElementById('p-bpm').innerText = data.bpm || "0";
    document.getElementById('p-pressure').innerText = data.presion || "0/0";
    document.getElementById('p-diag').innerText = data.diagnostico || data.riesgoDiabetes || "Sin observaciones.";
}
