const audio = document.getElementById('audio');
const chatBody = document.getElementById('chatBody');
const progress = document.getElementById('progress');

// --- Partículas 0/1 Blancas (Intactas) ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
let particles = [];

window.addEventListener('mousemove', e => {
    for(let i=0; i<2; i++) {
        particles.push({
            x: e.clientX, y: e.clientY,
            text: Math.random() > 0.5 ? '0' : '1',
            alpha: 1, speed: Math.random() * 2 + 1
        });
    }
});

function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "14px monospace";
    particles.forEach((p, i) => {
        ctx.fillText(p.text, p.x, p.y);
        p.y -= p.speed; p.alpha -= 0.01;
        if(p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(draw);
}
draw();

// --- Lógica de Radio Funcional ---
const radioStations = {
    anime: [
        { name: "Anime Hits", url: "https://stream.zeno.fm/7q8hn6vt9mruv" },
        { name: "J-Pop Power", url: "http://powerplayjpop.stream.com/live" }
    ],
    lofi: [
        { name: "Lofi Girl Direct", url: "https://ais-sa2.cdnstream1.com/2447_128.mp3" }
    ]
};

function updateRadioList() {
    const cat = document.getElementById('radioCategory').value;
    const select = document.getElementById('radioSelect');
    select.innerHTML = '<option value="">ESTACIÓN</option>';
    if (radioStations[cat]) {
        radioStations[cat].forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.url;
            opt.textContent = s.name;
            select.appendChild(opt);
        });
    }
}

function changeRadio() {
    const url = document.getElementById('radioSelect').value;
    if(!url) return;
    const ytContainer = document.querySelectorAll('.yt-chat-container');
    ytContainer.forEach(e => e.remove()); // Quitar videos previos
    audio.src = url;
    audio.play().catch(() => appendMessage("Error al conectar con la radio.", "ai"));
}

// --- Reproductor de Música e Incrustación ---
function loadAudio() {
    const url = document.getElementById('audioURL').value.trim();
    if(!url) return;
    audio.pause();

    if(url.includes('youtube.com') || url.includes('youtu.be')) {
        const id = url.includes('v=') ? new URL(url).searchParams.get('v') : url.split('/').pop();
        const videoElement = document.createElement('div');
        videoElement.className = 'yt-chat-container';
        videoElement.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media"></iframe>`;
        appendMessage('Sintonizando video...', 'ai', videoElement);
    } else {
        audio.src = url;
        audio.play().catch(e => appendMessage("Link no compatible.", "ai"));
    }
}

// Actualización de la Barra de Progreso Neón
audio.ontimeupdate = () => {
    if(audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + '%';
    }
};

// Controles Básicos
document.getElementById('playBtn').onclick = () => audio.play();
document.getElementById('pauseBtn').onclick = () => audio.pause();

// --- Wikipedia IA (Intacta) ---
async function sendMessage() {
    const input = document.getElementById('userInput');
    const query = input.value.trim();
    if(!query) return;
    appendMessage(query, 'user');
    input.value = '';

    try {
        const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await res.json();
        appendMessage(data.extract || "No encontré datos.", 'ai');
    } catch {
        appendMessage("Error de conexión.", 'ai');
    }
}

function appendMessage(txt, cls, element = null) {
    const d = document.createElement('div');
    d.className = 'msg ' + cls;
    d.innerHTML = `<b>${cls.toUpperCase()}:</b> ${txt}`;
    if (element) d.appendChild(element);
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- Generación de Marquesina de Tecnologías Luminosas ---
const techs = ['HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Node.js', 'API Rest', 'Cybersecurity', 'AI', 'Blockchain', 'Cloud', 'Git'];
const techTrack = document.getElementById('techTrack');

techs.forEach(t => {
    const div = document.createElement('div');
    div.className = 'tech-item';
    div.innerText = t;
    // Colores Neón Aleatorios
    const hue = Math.random() * 360;
    div.style.color = `hsl(${hue}, 100%, 75%)`;
    techTrack.appendChild(div);
});

// Duplicar para scroll infinito
const clone = techTrack.innerHTML;
techTrack.innerHTML += clone;
