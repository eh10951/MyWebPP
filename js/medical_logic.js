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
    document.getElementById('p-gender').innerText = data.genero === "M" ? "Masculino" : (data.genero === "F" ? "Femenino" : (data.genero || "N/A"));
    document.getElementById('p-curp').innerText = data.veces_atendido || 1;
    document.getElementById('p-weight').innerText = (data.peso_kg || "--") + " kg";
    
    // Obtener datos de la última consulta si están disponibles
    let ultimaConsultaDate = "N/A";
    let ultimaInstancia = "N/A";
    
    if (data.consultas && data.consultas.length > 0) {
        // Asumiendo que la última del array es la más reciente o la única
        const lastConsulta = data.consultas[data.consultas.length - 1];
        ultimaConsultaDate = lastConsulta.fecha || "N/A";
        ultimaInstancia = lastConsulta.instancia || "N/A";
    }
    
    const dateEl = document.getElementById('p-last-date');
    if(dateEl) dateEl.innerText = ultimaConsultaDate;
    
    const clinicEl = document.getElementById('p-clinic');
    if(clinicEl) clinicEl.innerText = ultimaInstancia;

    document.getElementById('p-glucose').innerText = (data.glucosa || "0");
    
    // Cambiar color de la glucosa según el nivel
    const glucoseRisk = document.getElementById('p-glucose-risk');
    if (glucoseRisk) {
        if (data.glucosa < 100) {
            glucoseRisk.innerText = "NORMAL";
            glucoseRisk.className = "risk-indicator risk-low";
        } else if (data.glucosa <= 125) {
            glucoseRisk.innerText = "PREDIABETES";
            glucoseRisk.className = "risk-indicator risk-medium"; // Suponiendo que exista
            glucoseRisk.style.color = "#f59e0b";
            glucoseRisk.style.backgroundColor = "rgba(245, 158, 11, 0.1)";
        } else {
            glucoseRisk.innerText = "ALTO";
            glucoseRisk.className = "risk-indicator risk-high";
        }
    }

    document.getElementById('p-pressure').innerText = data.presion || "0/0";
    document.getElementById('p-diag').innerText = data.diagnostico || "Sin observaciones.";

    // Renderizar Historial Clínico
    const tbody = document.getElementById('history-table-body');
    if (tbody) {
        tbody.innerHTML = "";
        
        if (data.consultas && data.consultas.length > 0) {
            // Recorrer el historial a la inversa para mostrar el más reciente arriba
            [...data.consultas].reverse().forEach((consulta, index) => {
                const tr = document.createElement('tr');
                // Estilo para filas alternas
                tr.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "rgba(0,0,0,0.015)";
                tr.style.borderBottom = "1px solid var(--glass-border)";
                
                tr.innerHTML = `
                    <td style="padding: 12px 15px; font-weight: 500;">${consulta.fecha || "-"}</td>
                    <td style="padding: 12px 15px;">${consulta.instancia || "-"}</td>
                    <td style="padding: 12px 15px;">${consulta.peso_kg ? consulta.peso_kg + 'kg' : "-"}</td>
                    <td style="padding: 12px 15px;">${consulta.presion || "-"}</td>
                    <td style="padding: 12px 15px;">
                        <span style="color: ${consulta.glucosa > 125 ? '#ef4444' : (consulta.glucosa >= 100 ? '#f59e0b' : '#10b981')}; font-weight: bold;">
                            ${consulta.glucosa || "-"}
                        </span>
                    </td>
                    <td style="padding: 12px 15px;">
                        <span style="background: ${consulta.diagnostico === 'Crítico' ? '#fecaca' : (consulta.diagnostico === 'Mejoría' ? '#bbf7d0' : '#e2e8f0')}; 
                                     color: ${consulta.diagnostico === 'Crítico' ? '#991b1b' : (consulta.diagnostico === 'Mejoría' ? '#166534' : '#475569')};
                                     padding: 4px 8px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">
                            ${consulta.diagnostico || "-"}
                        </span>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            
            renderCharts(data.consultas);
        } else {
            tbody.innerHTML = `<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--text-muted);">No hay historial disponible</td></tr>`;
        }
    }
}

// Variables globales para destruir gráficos previos antes de redibujar
let glucoseChartInstance = null;
let weightChartInstance = null;

function renderCharts(consultas) {
    if (!consultas || consultas.length === 0) return;

    // Ordenar de la más antigua a la más nueva cronológicamente para la gráfica
    const sortedConsultas = [...consultas].sort((a,b) => new Date(a.fecha) - new Date(b.fecha));

    const labels = sortedConsultas.map(c => c.fecha);
    const glucoseData = sortedConsultas.map(c => c.glucosa);
    const weightData = sortedConsultas.map(c => c.peso_kg);

    // Configuración común
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { 
                grid: { display: false },
                ticks: { font: { size: 10 } }
            },
            y: { 
                border: { dash: [4, 4] },
                grid: { color: 'rgba(0,0,0,0.05)' }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        }
    };

    // 1. Gráfica de Glucosa
    const ctxG = document.getElementById('glucoseChart');
    if (ctxG) {
        if (glucoseChartInstance) glucoseChartInstance.destroy();
        glucoseChartInstance = new Chart(ctxG.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Glucosa (mg/dL)',
                    data: glucoseData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#3b82f6',
                    pointRadius: 4,
                    fill: true,
                    tension: 0.3 // Suavizar curva
                }]
            },
            options: {
                ...chartOptions,
                plugins: {
                    title: { display: true, text: 'Niveles de Glucosa', font: { size: 14 } },
                    legend: { display: false }
                }
            }
        });
    }

    // 2. Gráfica de Peso
    const ctxW = document.getElementById('weightChart');
    if (ctxW) {
        if (weightChartInstance) weightChartInstance.destroy();
        weightChartInstance = new Chart(ctxW.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Peso (Kg)',
                    data: weightData,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#8b5cf6',
                    pointRadius: 4,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                ...chartOptions,
                plugins: {
                    title: { display: true, text: 'Evolución de Peso', font: { size: 14 } },
                    legend: { display: false }
                }
            }
        });
    }
}
