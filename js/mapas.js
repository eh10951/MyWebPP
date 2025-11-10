document.addEventListener('DOMContentLoaded', function () {

    // --- Configuración común para los gráficos ---
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 14,
                        family: "'Inter', sans-serif"
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#00ff99',
                bodyColor: '#ffffff',
                padding: 10,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'JetBrains Mono', monospace"
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            y: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'JetBrains Mono', monospace"
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    };

    // --- Gráfico 1: Tasa de Abandono Escolar (Líneas) ---
    const tasaAbandonoCtx = document.getElementById('tasaAbandonoChart')?.getContext('2d');
    if (tasaAbandonoCtx) {
        new Chart(tasaAbandonoCtx, {
            type: 'line',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Tasa de Abandono (%)',
                    data: [14.5, 14.2, 15.1, 14.8, 14.1, 13.9],
                    borderColor: '#00ff99',
                    backgroundColor: 'rgba(0, 255, 153, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00ff99',
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: commonChartOptions
        });
    }

    // --- Gráfico 2: Principales Causas de Deserción (Pastel) ---
    const causasDesercionCtx = document.getElementById('causasDesercionChart')?.getContext('2d');
    if (causasDesercionCtx) {
        new Chart(causasDesercionCtx, {
            type: 'pie',
            data: {
                labels: ['Económicos', 'Falta de Interés', 'Problemas Personales', 'Problemas Familiares', 'Otro'],
                datasets: [{
                    label: 'Causas de Deserción',
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        'rgba(0, 255, 153, 0.7)', // Verde neón
                        'rgba(0, 234, 255, 0.7)', // Cian neón
                        'rgba(255, 215, 0, 0.7)', // Amarillo
                        'rgba(255, 107, 107, 0.7)',// Rojo claro
                        'rgba(150, 150, 150, 0.7)' // Gris
                    ],
                    borderColor: 'rgba(10, 25, 47, 0.8)',
                    borderWidth: 2
                }]
            },
            options: {
                ...commonChartOptions,
                scales: {} // Los gráficos de pastel no usan escalas
            }
        });
    }

    // --- Gráfico 3: Deserción por Entidad Federativa (Barras) ---
    const desercionEstadoCtx = document.getElementById('desercionEstadoChart')?.getContext('2d');
    if (desercionEstadoCtx) {
        new Chart(desercionEstadoCtx, {
            type: 'bar',
            data: {
                labels: ['Chiapas', 'Michoacán', 'Durango', 'CDMX', 'Nuevo León', 'Jalisco'],
                datasets: [{
                    label: 'Tasa de Deserción por Estado (%)',
                    data: [18.2, 17.5, 16.9, 12.1, 9.8, 11.5],
                    backgroundColor: 'rgba(0, 234, 255, 0.6)',
                    borderColor: '#00eaff',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                ...commonChartOptions,
                indexAxis: 'y', // Para hacer el gráfico de barras horizontales
                 scales: {
                    x: {
                        ...commonChartOptions.scales.x,
                        beginAtZero: true
                    },
                    y: {
                        ...commonChartOptions.scales.y
                    }
                }
            }
        });
    }

});
