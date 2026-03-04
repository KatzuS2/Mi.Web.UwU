const audio = document.getElementById('audio');
const audioURL = document.getElementById('audioURL');
const progress = document.getElementById('progress');
const youtubeContainer = document.getElementById('youtubeContainer');
const radioSelect = document.getElementById('radioSelect');
const chatBody = document.getElementById('chatBody');
const pet = document.getElementById('pet');

// --- REPRODUCTOR E INTELIGENCIA DE BÚSQUEDA ---
function loadAudio() {
    const val = audioURL.value.trim();
    if(!val) return;

    // Si no es URL, busca en YouTube
    if(!val.startsWith('http')) {
        appendMessage(`Buscando "${val}"...`, 'ai');
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(val)}`, '_blank');
        return;
    }

    if(val.includes('youtube.com') || val.includes('youtu.be')) {
        audio.pause();
        const id = val.includes('v=') ? new URL(val).searchParams.get('v') : val.split('/').pop();
        youtubeContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay"></iframe>`;
    } else {
        audio.src = val;
        audio.play();
    }
}

// --- RADIOS ACTUALIZADAS ---
const radios = {
    anime: [{name:"Anime Hit", url:"https://stream.zeno.fm/7q8hn6vt9mruv"}],
    pop: [{name:"Pop Party", url:"http://icepool.silvacast.com/HITRADIO.mp3"}],
    rock: [{name:"Classic Rock", url:"http://virginrock.fmdir.com:8000/"}]
};

function updateRadioList() {
    const cat = document.getElementById('radioCategory').value;
    radioSelect.innerHTML = '<option value="">Seleccione Radio</option>';
    if(radios[cat]) {
        radios[cat].forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.url;
            opt.textContent = r.name;
            radioSelect.appendChild(opt);
        });
    }
}

function changeRadio() {
    if(!radioSelect.value) return;
    youtubeContainer.innerHTML = '';
    audio.src = radioSelect.value;
    audio.load();
    audio.play().catch(() => appendMessage("Error al conectar con la radio.", "ai"));
}

// --- HORÓSCOPO REAL ---
async function fetchHoroscope(signo) {
    appendMessage(`Consultando los astros para ${signo}...`, 'ai');
    try {
        // API estable (JSONP o CORS friendly)
        const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=TODAY`);
        const data = await res.json();
        alert(`✨ ${signo.toUpperCase()}:\n${data.data.horoscope_data}`);
    } catch (e) {
        alert("Los astros están nublados. Intenta más tarde.");
    }
}

// --- INICIALIZAR HORÓSCOPO ---
const signos = ['aries','tauro','geminis','cancer','leo','virgo','libra','escorpio','sagitario','capricornio','acuario','piscis'];
const hBody = document.getElementById('horoscopeBody');
signos.forEach(s => {
    const d = document.createElement('div');
    d.textContent = s;
    d.style.cssText = "background:#ff33cc; margin:2px; padding:4px; border-radius:5px; cursor:pointer; font-size:11px; display:inline-block;";
    d.onclick = () => fetchHoroscope(s);
    hBody.appendChild(d);
});

// --- MASCOTA REACTIVA ---
let moods = ['😊','💖','🐱','😴'];
pet.onclick = () => {
    const randomMood = moods[Math.floor(Math.random()*moods.length)];
    pet.textContent = randomMood;
    pet.style.transform = "scale(1.5) rotate(20deg)";
    setTimeout(() => pet.style.transform = "scale(1)", 300);
};

// --- CHAT SIMPLE ---
function appendMessage(msg, cls) {
    const d = document.createElement('div');
    d.className = 'msg ' + cls;
    d.textContent = msg;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('userInput');
    if(!input.value) return;
    appendMessage(input.value, 'user');
    if(input.value.toLowerCase().includes('hola')) appendMessage('¡Hola! Soy tu asistente Kawaii 🌸', 'ai');
    input.value = '';
}
