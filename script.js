// ====== REPRODUCTOR NUBE ======
const audio = document.getElementById('audio');
const audioURL = document.getElementById('audioURL');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progress = document.getElementById('progress');

function loadAudio() {
    if (audioURL.value.trim() === "") return alert("Pega un link de MP3 😸");
    audio.src = audioURL.value.trim();
    audio.load();
}

playBtn.addEventListener('click', () => {
    if(!audio.src) return alert("Primero carga un MP3 🌈");
    audio.play();
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
});

audio.addEventListener('timeupdate', () => {
    if(audio.duration){
        let percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + "%";
    }
});

// ====== CHAT FUTURISTA ======
const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');

function sendMessage(){
    let msg = userInput.value.trim();
    if(msg === "") return;
    
    // mensaje usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = msg;
    chatBody.appendChild(userMsg);
    
    userInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // respuesta AI simulada
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'msg ai';
        aiMsg.textContent = "UwU 💖: " + msg.split("").reverse().join("") + " ✨"; // respuesta divertida
        chatBody.appendChild(aiMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

// ====== TAMAGOTCHI ANIMADO ======
const pet = document.getElementById('pet');
let bounce = 0;
setInterval(() => {
    bounce += 1;
    pet.style.transform = `translateY(${Math.sin(bounce/10)*10}px)`;
}, 50);

// ====== PARTICULAS 0 Y 1 ======
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('mousemove', (e)=>{
    for(let i=0;i<3;i++){ // varias partículas por movimiento
        particles.push({
            x: e.clientX,
            y: e.clientY,
            text: Math.random() > 0.5 ? "0" : "1",
            alpha: 1,
            size: Math.random()*18 + 12,
            speedX: (Math.random()-0.5)*2,
            speedY: -2-Math.random()*2
        });
    }
});

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    for(let i=0;i<particles.length;i++){
        let p = particles[i];
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.text, p.x, p.y);
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.02;
    }
    // eliminar partículas invisibles
    particles = particles.filter(p=>p.alpha>0);
    
    requestAnimationFrame(animate);
}
animate();
