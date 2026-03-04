
// --- Lógica del Rastro del Mouse (0 y 1 Blanco Neon) ---
const trailCanvas = document.getElementById('trailCanvas');
const trailCtx = trailCanvas.getContext('2d');
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

let particles = [];

function drawTrail() {
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    trailCtx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Blanco Neon
    trailCtx.font = "12px monospace";
    particles.forEach((p, i) => {
        trailCtx.fillText(p.text, p.x, p.y);
        p.y += p.speed;
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    });
    requestAnimationFrame(drawTrail);
}

window.addEventListener('mousemove', e => {
    particles.push({
        x: e.clientX,
        y: e.clientY,
        text: Math.random() > 0.5 ? '0' : '1',
        alpha: 1,
        speed: Math.random() * 1 + 0.5
    });
});
drawTrail();


// --- Búsqueda de Música y Reproducción en la Misma Página ---
function searchAndPlay() {
    const query = document.getElementById('audioURL').value.trim();
    if (!query) return;

    const ytContainer = document.getElementById('youtubeContainer');
    // Buscamos e incrustamos el video directamente
    const searchUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}&autoplay=1`;
    ytContainer.innerHTML = `<iframe width="560" height="315" src="${searchUrl}" allow="autoplay" frameborder="0"></iframe>`;
    
    appendMessage(`Buscando y sintonizando "${query}"... nyan!`, 'ai');
}

// --- Radio de Anime ---
const radioStations = {
    anime: [
        { name: "Anime Hits Radio", url: "https://stream.zeno.fm/7q8hn6vt9mruv" },
        { name: "J-Pop Powerplay", url: "http://powerplayjpop.stream.com/live" }
    ]
};

function updateRadioList() {
    const cat = document.getElementById('radioCategory').value;
    const select = document.getElementById('radioSelect');
    select.innerHTML = '<option>Cargando...</option>';
    if (radioStations[cat]) {
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
    audio.play().catch(() => alert("Error al conectar con la radio de anime nyan!"));
}

// --- Chat IA con Interfaz Kawaii y Wikipedia ---
async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    // Búsqueda real en Wikipedia
    try {
        const response = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`);
        const data = await response.json();
        if (data.extract) {
            appendMessage(data.extract, 'ai');
        } else {
            appendMessage("¡Nyan! No encontré eso en mis archivos de Wikipedia, ¿puedes preguntar de otra forma?", 'ai');
        }
    } catch {
        appendMessage("¡Uy! Hubo un error de conexión con la red nyan-tástica.", 'ai');
    }
}

function appendMessage(msg, type) {
    const body = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.textContent = msg;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight; // Mantiene el chat en el recuadro
}

// --- Horóscopo Planetario Giratorio ---
const signosData = [
    { name: 'Aries', icon: '♈️', color: '#ff4444', planet: 'Marte' },
    { name: 'Tauro', icon: '♉️', color: '#ffcc00', planet: 'Venus' },
    { name: 'Geminis', icon: '♊️', color: '#33ccff', planet: 'Mercurio' },
    { name: 'Cancer', icon: '♋️', color: '#fff', planet: 'Luna' },
    { name: 'Leo', icon: '♌️', color: '#ff9900', planet: 'Sol' },
    { name: 'Virgo', icon: '♍️', color: '#99cc33', planet: 'Mercurio' },
    { name: 'Libra', icon: '♎️', color: '#ffccf2', planet: 'Venus' },
    { name: 'Escorpio', icon: '♏️', color: '#ff00ff', planet: 'Plutón' },
    { name: 'Sagitario', icon: '♐️', color: '#9933cc', planet: 'Júpiter' },
    { name: 'Capricornio', icon: '♑️', color: '#666', planet: 'Saturno' },
    { name: 'Acuario', icon: '♒️', color: '#3366ff', planet: 'Urano' },
    { name: 'Piscis', icon: '♓️', color: '#33ffcc', planet: 'Neptuno' }
];

const hOrbit = document.getElementById('horoscopeOrbit');

signosData.forEach((s, i) => {
    const signPlanet = document.createElement('div');
    signPlanet.className = 'h-planet-sign';
    signPlanet.style.backgroundColor = s.color;
    signPlanet.style.boxShadow = `0 0 10px #fff, 0 0 20px ${s.color}`;
    // Ajuste de órbita y duración para cada planeta
    signPlanet.style.animationDuration = `${20 + i * 2}s`;
    
    signPlanet.innerHTML = `
        <span class="h-sign-icon">${s.icon}</span>
        <span class="h-sign-name">${s.name} (${s.planet})</span>
    `;
    signPlanet.onclick = () => getDailyFortune(s.name);
    hOrbit.appendChild(signPlanet);
});

async function getDailyFortune(signo) {
    appendMessage(`Consultando el oráculo planetario para ${signo}... nyan!`, 'ai');
    try {
        const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo.toLowerCase()}&day=TODAY`);
        const data = await res.json();
        alert(`✨ ${signo.toUpperCase()} (Hoy):\n${data.data.horoscope_data}`);
    } catch {
        alert(`¡Nyan! Las estrellas están nubladas para ${signo} hoy.`);
    }
}

// --- Movimiento del Gatito Mascota ---
const kittyPet = document.getElementById('kittyPet');
let kittyX = 150, kittyY = 300, moveX = 1.5, moveY = 1;

function kittyAI() {
    kittyX += moveX;
    kittyY += moveY;
    
    // Rebote en los bordes de la pantalla
    if (kittyX > window.innerWidth - 60 || kittyX < 0) moveX *= -1;
    if (kittyY > window.innerHeight - 80 || kittyY < 50) moveY *= -1;
    
    kittyPet.style.left = kittyX + "px";
    kittyPet.style.top = kittyY + "px";
    
    // Pequeño giro al cambiar de dirección
    kittyPet.style.transform = `scaleX(${moveX > 0 ? 1 : -1})`;

    if (Math.random() < 0.005) { // Maullido aleatorio
        appendMessage("¡Miau! ✨", "ai");
    }
    
    requestAnimationFrame(kittyAI);
}
kittyAI();


// --- Partículas de Fondo ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let parts = [];
function createParts() {
    for(let i=0; i<80; i++) {
        parts.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: Math.random()*1.5, c: Math.random() > 0.5 ? '#ff00ff' : '#33ccff'});
    }
}
function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    parts.forEach(p => {
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
        ctx.fill();
        p.y -= 0.3;
        if(p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(draw);
}
createParts(); draw();
