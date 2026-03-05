// Actualización del reloj en tiempo real
function startClock() {
    const clockElement = document.getElementById('clock');
    setInterval(() => {
        const now = new Date();
        clockElement.innerText = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', minute: '2-digit', hour12: true 
        });
    }, 1000);
}

// Lógica básica del botón Play
const playBtn = document.getElementById('playBtn');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.innerText = isPlaying ? "⏸" : "▶";
    playBtn.style.boxShadow = isPlaying ? "0 0 25px #ff33cc" : "0 0 12px #ff33cc";
});

// Inicializar funciones
document.addEventListener('DOMContentLoaded', startClock);
