
// --- Lógica del Buscador Pro ---
function loadAudio() {
    const query = document.getElementById('audioURL').value.trim();
    if(!query) return;

    const ytContainer = document.getElementById('youtubeContainer');
    
    if(query.includes('youtube.com') || query.includes('youtu.be')) {
        const id = extractYTID(query);
        ytContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay"></iframe>`;
    } else {
        // Simulación de búsqueda: Abrir en mini-ventana o buscar el primer resultado
        appendMessage(`Buscando "${query}" en la base de datos central...`, 'ai');
        const searchUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}&autoplay=1`;
        ytContainer.innerHTML = `<iframe width="560" height="315" src="${searchUrl}" allow="autoplay"></iframe>`;
    }
}

function extractYTID(url){
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
}

// --- Radio Funcional ---
const radioStations = {
    lofi: [{name: "Lofi Girl Direct", url: "https://ais-sa2.cdnstream1.com/2447_128.mp3"}],
    retro: [{name: "80s Hits", url: "http://streaming.radionomy.com/Best80"}],
    kpop: [{name: "K-Pop Radio", url: "https://kpop.stream.com/live"}]
};

function updateRadioList() {
    const cat = document.getElementById('radioCategory').value;
    const select = document.getElementById('radioSelect');
    select.innerHTML = '<option>Cargando...</option>';
    if(radioStations[cat]) {
        select.innerHTML = '';
        radioStations[cat].forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.url;
            opt.textContent = s.name;
            select.appendChild(opt);
        });
    }
}

function changeRadio() {
    const audio = document.getElementById('audio');
    audio.src = document.getElementById('radioSelect').value;
    audio.play().catch(() => alert("Error: El servidor de radio está saturado. Intenta otro canal."));
}

// --- IA con "Wikipedia" (Simulada con Wiki-API) ---
async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if(!text) return;

    appendMessage(text, 'user');
    input.value = '';

    // Lógica de búsqueda real en Wikipedia
    try {
        const response = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`);
        const data = await response.json();
        if(data.extract) {
            appendMessage(data.extract, 'ai');
        } else {
            appendMessage("No encontré eso en mis archivos, ¿puedes ser más específico?", 'ai');
        }
    } catch {
        appendMessage("Error de conexión con la red neuronal.", 'ai');
    }
}

function appendMessage(msg, type) {
    const body = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.style.marginBottom = "10px";
    div.style.color = type === 'user' ? '#ff00ff' : '#00ffcc';
    div.innerHTML = `<strong>${type.toUpperCase()}:</strong> ${msg}`;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

// --- Horóscopo Pro ---
const signos = ['Aries','Tauro','Geminis','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'];
const hGrid = document.getElementById('horoscopeBody');

signos.forEach(s => {
    const div = document.createElement('div');
    div.className = 'h-item';
    div.textContent = s;
    div.onclick = () => getFortune(s);
    hGrid.appendChild(div);
});

async function getFortune(signo) {
    document.getElementById('horoscopeResult').textContent = "Consultando constelaciones...";
    try {
        const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo.toLowerCase()}&day=TODAY`);
        const data = await res.json();
        document.getElementById('horoscopeResult').textContent = data.data.horoscope_data;
    } catch {
        document.getElementById('horoscopeResult').textContent = "La señal de Saturno es débil hoy.";
    }
}

// --- Tamagotchi 90s Movimiento ---
const petCont = document.getElementById('petContainer');
let posX = 100, posY = 200, moveX = 1, moveY = 1;

function tamagotchiAI() {
    posX += moveX;
    posY += moveY;
    
    if(posX > window.innerWidth - 130 || posX < 0) moveX *= -1;
    if(posY > window.innerHeight - 160 || posY < 50) moveY *= -1;
    
    petCont.style.left = posX + "px";
    petCont.style.top = posY + "px";
    
    if(Math.random() < 0.01) { // Cambio de humor aleatorio
        document.getElementById('pet').textContent = "(^O^)";
        setTimeout(() => document.getElementById('pet').textContent = "v(^_^)v", 1000);
    }
    
    requestAnimationFrame(tamagotchiAI);
}
tamagotchiAI();

// --- Partículas de Fondo ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let parts = [];
function createParts() {
    for(let i=0; i<100; i++) {
        parts.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: Math.random()*2});
    }
}
function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "#ff00ff";
    parts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
        ctx.fill();
        p.y -= 0.5;
        if(p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(draw);
}
createParts(); draw();
