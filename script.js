// =======================
// Variables globales
// =======================
const audio = document.getElementById('audio');
const audioURL = document.getElementById('audioURL');
const progress = document.getElementById('progress');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const youtubeContainer = document.getElementById('youtubeContainer');

const radioCategory = document.getElementById('radioCategory');
const radioSelect = document.getElementById('radioSelect');

const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');

const horoscopeBody = document.getElementById('horoscopeBody');
const weatherDiv = document.getElementById('weather');

const pet = document.getElementById('pet');

// =======================
// Reproductor MP3 y YouTube
// =======================
function loadAudio() {
    const url = audioURL.value.trim();
    if(!url) return;
    
    // Si es YouTube
    if(url.includes('youtube.com') || url.includes('youtu.be')) {
        audio.pause();
        audio.src = '';
        youtubeContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${extractYouTubeID(url)}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } else {
        youtubeContainer.innerHTML = '';
        audio.src = url;
        audio.play();
    }
}

function extractYouTubeID(url){
    let id = '';
    if(url.includes('youtu.be')){
        id = url.split('/').pop();
    } else {
        const params = new URL(url).searchParams;
        id = params.get('v');
    }
    return id;
}

playBtn.onclick = ()=>audio.play();
pauseBtn.onclick = ()=>audio.pause();

// Actualizar barra de progreso
audio.ontimeupdate = ()=>{
    if(audio.duration) progress.style.width = (audio.currentTime/audio.duration*100)+'%';
}

// =======================
// Radios funcionales
// =======================
const radios = {
    anime:[
        {name:"Radio Anime 1", url:"https://radio-stream-url-1"},
        {name:"Radio Anime 2", url:"https://radio-stream-url-2"},
        {name:"Radio Anime 3", url:"https://radio-stream-url-3"}
    ],
    nacional:[
        {name:"Radio Nacional 1", url:"https://radio-stream-url-4"},
        {name:"Radio Nacional 2", url:"https://radio-stream-url-5"}
    ],
    local:[
        {name:"Radio Local 1", url:"https://radio-stream-url-6"},
        {name:"Radio Local 2", url:"https://radio-stream-url-7"}
    ],
    pop:[
        {name:"Radio Pop 1", url:"https://radio-stream-url-8"},
        {name:"Radio Pop 2", url:"https://radio-stream-url-9"}
    ],
    rock:[
        {name:"Radio Rock 1", url:"https://radio-stream-url-10"},
        {name:"Radio Rock 2", url:"https://radio-stream-url-11"}
    ]
};

function updateRadioList(){
    const cat = radioCategory.value;
    radioSelect.innerHTML = `<option value="">Seleccione Radio</option>`;
    if(radios[cat]){
        radios[cat].forEach((r,i)=>{
            const option = document.createElement('option');
            option.value = r.url;
            option.textContent = r.name;
            radioSelect.appendChild(option);
        });
    }
}

function changeRadio(){
    const url = radioSelect.value;
    if(!url) return;
    youtubeContainer.innerHTML = '';
    audio.src = url;
    audio.play();
}

// =======================
// Partículas kawaii 0/1
// =======================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<150;i++){
    particles.push({
        x:Math.random()*W,
        y:Math.random()*H,
        text:Math.random()>0.5?'0':'1',
        alpha:Math.random(),
        size: Math.random()*12+8,
        speed: Math.random()*1.5+0.5
    });
}

canvas.addEventListener('mousemove', e=>{
    particles.push({
        x:e.clientX,
        y:e.clientY,
        text:Math.random()>0.5?'0':'1',
        alpha:1,
        size: Math.random()*12+8,
        speed: Math.random()*2+1
    });
});

function drawParticles(){
    ctx.clearRect(0,0,W,H);
    particles.forEach((p)=>{
        ctx.fillStyle=`rgba(255,255,255,${p.alpha})`;
        ctx.font=`${p.size}px monospace`;
        ctx.fillText(p.text,p.x,p.y);
        p.y -= p.speed;
        p.alpha -=0.005;
        if(p.alpha<=0){
            p.x = Math.random()*W;
            p.y = H+10;
            p.alpha = Math.random();
        }
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

window.onresize = ()=>{
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
}

// =======================
// Chat AI Wikipedia + fecha/clima
// =======================
async function sendMessage(){
    const question = userInput.value.trim();
    if(!question) return;
    appendMessage(question,'user');
    userInput.value='';

    // Preguntas de día o clima
    if(question.toLowerCase().includes('día') || question.toLowerCase().includes('fecha')){
        const date = new Date();
        appendMessage(`Hoy es ${date.toLocaleDateString()} y son las ${date.toLocaleTimeString()}`,'ai');
        return;
    }
    if(question.toLowerCase().includes('clima')){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async pos=>{
                const lat=pos.coords.latitude;
                const lon=pos.coords.longitude;
                const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`).then(r=>r.json());
                const w = data.current_weather;
                appendMessage(`Clima actual: ${w.temperature}°C, viento ${w.windspeed} km/h`,'ai');
            });
        } else {
            appendMessage(`No puedo acceder a tu ubicación.`,'ai');
        }
        return;
    }

    // Pregunta Wikipedia
    try{
        const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(question)}`);
        const json = await res.json();
        if(json.extract){
            appendMessage(json.extract,'ai');
        } else {
            appendMessage('No encontré información sobre eso.','ai');
        }
    } catch(e){
        appendMessage('Error al consultar Wikipedia.','ai');
    }
}

function appendMessage(msg,cls){
    const div = document.createElement('div');
    div.className='msg '+cls;
    div.textContent=msg;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// =======================
// Horóscopo diario real
// =======================
const signos = ['aries','tauro','geminis','cancer','leo','virgo','libra','escorpio','sagitario','capricornio','acuario','piscis'];
horoscopeBody.innerHTML='';
signos.forEach(s=>{
    const div = document.createElement('div');
    div.textContent = s;
    div.style.cursor='pointer';
    div.onclick = ()=>fetchHoroscope(s);
    horoscopeBody.appendChild(div);
});

async function fetchHoroscope(signo){
    try{
        const res = await fetch(`https://aztro.sameerkumar.website/?sign=${signo}&day=today`, {method:'POST'});
        const data = await res.json();
        alert(`Horóscopo de ${signo} hoy:\n\n${data.description}`);
    } catch(e){
        alert('No se pudo obtener el horóscopo.');
    }
}

// =======================
// Tamagotchi pixel 90s con vida
// =======================
let petX = 300;
let petY = 500;
let dx = 1;
let dy = 1;
let moods = ['😊','😡','😴','😻'];
let currentMood = 0;

function movePet(){
    petX += dx*2;
    petY += dy*1.5;
    if(petX<0 || petX>window.innerWidth-80) dx*=-1;
    if(petY<200 || petY>window.innerHeight-80) dy*=-1;
    pet.style.left = petX+'px';
    pet.style.top = petY+'px';
    pet.textContent = moods[currentMood];
    requestAnimationFrame(movePet);
}
movePet();

pet.addEventListener('mouseenter', ()=>{currentMood=3;}); // feliz si lo acaricias
pet.addEventListener('mouseleave', ()=>{currentMood=0;}); // vuelve a normal
