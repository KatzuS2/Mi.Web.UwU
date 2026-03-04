const audio = document.getElementById('audio');
const chatBody = document.getElementById('chatBody');

// --- Partículas 0/1 Blancas ---
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

// --- Reproductor de Música e Incrustación de Video ---
function loadAudio() {
    const url = document.getElementById('audioURL').value.trim();
    if(!url) return;
    audio.pause(); // Pausar cualquier audio directo previo

    if(url.includes('youtube.com') || url.includes('youtu.be')) {
        const id = url.includes('v=') ? new URL(url).searchParams.get('v') : url.split('/').pop();
        const videoElement = document.createElement('div');
        videoElement.className = 'yt-chat-container';
        videoElement.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media"></iframe>`;
        appendMessage('Sintonizando video de YouTube...', 'ai', videoElement);
    } else {
        audio.src = url;
        audio.play().catch(e => appendMessage("Link no compatible.", "ai"));
    }
}

// --- Wikipedia IA ---
async function sendMessage() {
    const input = document.getElementById('userInput');
    const query = input.value.trim();
    if(!query) return;
    appendMessage(query, 'user');
    input.value = '';

    try {
        const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await res.json();
        appendMessage(data.extract || "No encontré datos exactos.", 'ai');
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
    blinkChat();
}

function blinkChat() {
    const chat = document.getElementById('chatWindow');
    chat.classList.add('chat-blink');
    setTimeout(() => chat.classList.remove('chat-blink'), 200);
}

// --- Horóscopo Infinito ---
const signos = ['aries','tauro','geminis','cancer','leo','virgo','libra','escorpio','sagitario','capricornio','acuario','piscis'];
const track = document.getElementById('horoscopeBody');
signos.forEach(s => {
    const div = document.createElement('div');
    div.className = 'h-item';
    div.innerText = s;
    div.style.color = `hsl(${Math.random()*360}, 100%, 70%)`;
    div.style.textShadow = `0 0 10px currentColor`;
    div.onclick = () => fetchFortune(s);
    track.appendChild(div);
});

async function fetchFortune(s) {
    appendMessage(`Consultando suerte para ${s}...`, 'ai');
}
