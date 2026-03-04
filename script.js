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

// --- Reproductor Universal ---
function loadAudio() {
    const url = document.getElementById('audioURL').value.trim();
    if(!url) return;
    const ytContainer = document.getElementById('youtubeContainer');
    
    if(url.includes('youtube.com') || url.includes('youtu.be')) {
        const id = url.includes('v=') ? new URL(url).searchParams.get('v') : url.split('/').pop();
        ytContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay"></iframe>`;
        audio.pause();
    } else {
        ytContainer.innerHTML = '';
        audio.src = url;
        audio.play().catch(e => appendMessage("Link no compatible para streaming directo.", "ai"));
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
        appendMessage(data.extract || "No encontré datos exactos en el mainframe.", 'ai');
    } catch {
        appendMessage("Error de conexión con la red.", 'ai');
    }
}

function appendMessage(txt, cls) {
    const d = document.createElement('div');
    d.className = 'msg ' + cls;
    d.innerHTML = `<b>${cls.toUpperCase()}:</b> ${txt}`;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
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
    const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${s}&day=TODAY`);
    const data = await res.json();
    alert(`✨ ${s.toUpperCase()}: ${data.data.horoscope_data}`);
}
