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

// ====== CHAT AI SIMULADO (mejorado) ======
const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');

function sendMessage(){
    const msg = userInput.value.trim();
    if(!msg) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = msg;
    chatBody.appendChild(userMsg);
    userInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(()=>{
        const aiMsg = document.createElement('div');
        aiMsg.className = 'msg ai';
        // respuestas simuladas tipo mini Wikipedia
        let response = miniWikiResponse(msg);
        aiMsg.textContent = response;
        chatBody.appendChild(aiMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    },700);
}

function miniWikiResponse(input){
    const lower = input.toLowerCase();
    if(lower.includes("capital de francia")) return "La capital de Francia es París.";
    if(lower.includes("python")) return "Python es un lenguaje de programación muy popular.";
    if(lower.includes("tamagotchi")) return "Tamagotchi es un juego virtual de mascotas de los 90 muy famoso.";
    if(lower.includes("uwu")) return "UwU es una expresión kawaii usada en internet.";
    return "Lo siento, no sé la respuesta 😅 pero sigue preguntando!";
}

// ====== TAMAGOTCHI ======
const pet = document.getElementById('pet');
let petX = 100, petY = 100, dirX = 1, dirY = 1;
function movePet(){
    petX += dirX*2; petY += dirY*1.5;
    if(petX<0 || petX>window.innerWidth-80) dirX*=-1;
    if(petY<150 || petY>window.innerHeight-80) dirY*=-1;
    pet.style.transform = `translate(${petX}px, ${petY}px)`;
}
setInterval(movePet,50);

// Reacción al mouse
pet.addEventListener('mouseenter', ()=>{ pet.style.transform += ' scale(1.2)'; setTimeout(()=>{pet.style.transform=`translate(${petX}px, ${petY}px)`},500); });

// ====== HOROSCOPO ======
const horoscopeBody = document.getElementById('horoscopeBody');
const signs = ["Aries ♈","Tauro ♉","Géminis ♊","Cáncer ♋","Leo ♌","Virgo ♍","Libra ♎","Escorpio ♏","Sagitario ♐","Capricornio ♑","Acuario ♒","Piscis ♓"];
let currentSign=0;
function prevSign(){ currentSign=(currentSign-1+signs.length)%signs.length; horoscopeBody.textContent=signs[currentSign]; }
function nextSign(){ currentSign=(currentSign+1)%signs.length; horoscopeBody.textContent=signs[currentSign]; }

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
