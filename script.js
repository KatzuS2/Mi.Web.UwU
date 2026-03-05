
const audio = new Audio();
const progress = document.getElementById('progress');
const currentTimeText = document.getElementById('currentTime');
const timeLeftText = document.getElementById('timeLeft');

// Enviar mensaje con Enter
function handleKeyPress(e) { if(e.key === 'Enter') sendMessage(); }

// Lógica de Tiempo y Barra
audio.ontimeupdate = () => {
    if(audio.duration) {
        const p = (audio.currentTime / audio.duration) * 100;
        progress.style.width = p + '%';
        currentTimeText.innerText = formatTime(audio.currentTime);
        timeLeftText.innerText = "-" + formatTime(audio.duration - audio.currentTime);
    }
};

function formatTime(s) {
    let m = Math.floor(s / 60), seg = Math.floor(s % 60);
    return `${m}:${seg < 10 ? '0'+seg : seg}`;
}

// Chat e Interacción con Mascota
async function sendMessage() {
    const input = document.getElementById('userInput');
    const msg = input.value.trim().toLowerCase();
    if(!msg) return;
    
    appendMessage(input.value, 'user');
    input.value = '';

    if(msg.includes('como estas') || msg.includes('comiste')) {
        setTimeout(() => appendMessage("¡Miau! Estoy genial, mis circuitos están llenos de energía. (◕ᴥ◕)", "ai"), 600);
    } else {
        // Búsqueda simple en Wikipedia
        const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(msg)}`);
        const data = await res.json();
        appendMessage(data.extract || "No sé eso, pero mi colita dice que es interesante.", "ai");
    }
}

function appendMessage(txt, cls) {
    const body = document.getElementById('chatBody');
    const d = document.createElement('div');
    d.className = `msg ${cls}`;
    d.innerText = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
}

// Llenar Marquesina Hacker
const techs = ['⚡ JS', '🌐 HTML5', '🎨 CSS3', '🐍 PYTHON', '💀 HACK', '🛰️ SIGNAL', '🛸 REACT', '🔋 KERNEL'];
const track = document.getElementById('techTrack');
techs.forEach(t => {
    const s = document.createElement('span');
    s.innerText = t;
    track.appendChild(s);
});
track.innerHTML += track.innerHTML; // Duplicar para scroll infinito
