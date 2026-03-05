const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const timeLeft = document.getElementById('timeLeft');
const currentTimeDisplay = document.getElementById('currentTime');

// --- Partículas 0/1 Blancas Neon ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

window.addEventListener('mousemove', e => {
    particles.push({ x: e.clientX, y: e.clientY, text: Math.random() > 0.5 ? '0' : '1', alpha: 1 });
});

function drawParticles() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "12px monospace";
    particles.forEach((p, i) => {
        ctx.fillText(p.text, p.x, p.y);
        p.y -= 1; p.alpha -= 0.01;
        if(p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

// --- Buscador y Tiempo ---
function loadAudio() {
    const val = document.getElementById('audioURL').value;
    if(val.includes('youtube.com') || val.includes('youtu.be')) {
        const id = val.includes('v=') ? new URL(val).searchParams.get('v') : val.split('/').pop();
        appendMessage("Cargando video de YouTube en el mainframe...", "ai");
        // Aquí podrías insertar un iframe pequeño si quisieras verlo
    } else {
        audio.src = val;
        audio.play();
    }
}

audio.ontimeupdate = () => {
    const p = (audio.currentTime / audio.duration) * 100;
    progress.style.width = p + '%';
    
    // Cálculos de tiempo
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration - audio.currentTime);
    currentTimeDisplay.innerText = current;
    timeLeft.innerText = "-" + total;
};

function formatTime(secs) {
    if (isNaN(secs)) return "00:00";
    let m = Math.floor(secs / 60), s = Math.floor(secs % 60);
    return (m < 10 ? "0"+m : m) + ":" + (s < 10 ? "0"+s : s);
}

// --- Chat IA + Mascota ---
function handleKeyPress(e) { if(e.key === 'Enter') sendMessage(); }

async function sendMessage() {
    const input = document.getElementById('userInput');
    const msg = input.value.trim().toLowerCase();
    if(!msg) return;

    appendMessage(input.value, 'user');
    input.value = '';

    // Respuesta especial de la mascota
    if(msg.includes('como estas') || msg.includes('comiste') || msg.includes('zorro')) {
        setTimeout(() => {
            const petReplies = [
                "¡Miau! Estoy muy feliz de verte. (◕ᴥ◕)",
                "¡Purr! Ya comí unos bits de datos muy ricos.",
                "Estoy listo para jugar por la pantalla. ¡Mira cómo corro!",
                "¡Miau! Me siento muy ciber-kawaii hoy."
            ];
            appendMessage(petReplies[Math.floor(Math.random()*petReplies.length)], 'ai');
        }, 1000);
    } else {
        // Respuesta de Wikipedia normal
        try {
            const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(msg)}`);
            const data = await res.json();
            appendMessage(data.extract || "No encontré esa info, pero mi colita dice que es interesante.", 'ai');
        } catch { appendMessage("Error de conexión al cerebro central.", 'ai'); }
    }
}

function appendMessage(txt, cls) {
    const b = document.getElementById('chatBody');
    const d = document.createElement('div');
    d.className = `msg ${cls}`;
    d.innerText = txt;
    b.appendChild(d);
    b.scrollTop = b.scrollHeight;
}
