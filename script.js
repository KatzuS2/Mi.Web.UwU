
// ====== REPRODUCTOR ======
const audio = document.getElementById('audio');
const audioURL = document.getElementById('audioURL');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progress = document.getElementById('progress');
const radioSelect = document.getElementById('radioSelect');

function loadAudio(){
    if(!audioURL.value.trim()) return alert("Pegá un MP3 🎵");
    audio.src = audioURL.value.trim();
    audio.load();
    audio.play();
}
playBtn.onclick = ()=>{ if(audio.src) audio.play(); }
pauseBtn.onclick = ()=>{ audio.pause(); }
audio.ontimeupdate = ()=>{
    if(audio.duration) progress.style.width = (audio.currentTime/audio.duration*100)+"%";
}
function changeRadio(){
    if(radioSelect.value){
        audio.src = radioSelect.value;
        audio.load();
        audio.play();
    }
}

// ====== CHAT AI con Wikipedia ======
const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');

async function sendMessage(){
    const msg = userInput.value.trim();
    if(!msg) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = msg;
    chatBody.appendChild(userMsg);
    userInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    const aiMsg = document.createElement('div');
    aiMsg.className = 'msg ai';
    aiMsg.textContent = "Buscando respuesta... ⏳";
    chatBody.appendChild(aiMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const response = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(msg)}`);
        const data = await response.json();
        if(data.extract){
            aiMsg.textContent = data.extract;
        } else { aiMsg.textContent = "No encontré información 😅"; }
    } catch(e){
        aiMsg.textContent = "Error al buscar información 😢";
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ====== TAMAGOTCHI ======
const pet = document.getElementById('pet');
let petX = 100, petY = 100, dirX = 1, dirY = 1;

function movePet(){
    petX += dirX*2; petY += dirY*1.5;
    if(petX<0 || petX>window.innerWidth-80) dirX*=-1;
    if(petY<150 || petY>window.innerHeight-80) dirY*=-1;
    pet.style.transform = `translate(${petX}px, ${petY}px) scale(${petHover?1.2:1})`;
}
let petHover=false;
pet.addEventListener('mouseenter', ()=>{ petHover=true; });
pet.addEventListener('mouseleave', ()=>{ petHover=false; });

setInterval(movePet,50);

// ====== HOROSCOPO TODOS LOS SIGNOS ======
const horoscopeBody = document.getElementById('horoscopeBody');
const signs = ["Aries ♈","Tauro ♉","Géminis ♊","Cáncer ♋","Leo ♌","Virgo ♍","Libra ♎","Escorpio ♏","Sagitario ♐","Capricornio ♑","Acuario ♒","Piscis ♓"];
horoscopeBody.innerHTML = '';
signs.forEach(s => {
    const div = document.createElement('div'); div.textContent = s;
    horoscopeBody.appendChild(div);
});

// ====== PARTICULAS 0 Y 1 ======
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles=[];
function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener('resize',resizeCanvas); resizeCanvas();

document.addEventListener('mousemove',(e)=>{
    for(let i=0;i<3;i++){
        particles.push({ x:e.clientX, y:e.clientY, text:Math.random()>0.5?"0":"1", alpha:1, size:Math.random()*18+12, speedX:(Math.random()-0.5)*2, speedY:-2-Math.random()*2 });
    }
});

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particles.length;i++){
        let p = particles[i];
        ctx.fillStyle=`rgba(255,255,255,${p.alpha})`;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.text,p.x,p.y);
        p.x+=p.speedX; p.y+=p.speedY; p.alpha-=0.02;
    }
    particles = particles.filter(p=>p.alpha>0);
    requestAnimationFrame(animate);
}
animate();
