const petEl = document.getElementById('pet');
let mood = "😊";
let energy = 100;
let x = 100, y = 300;
let velX = 1.2, velY = 0.8;

function updatePet() {
    // Movimiento rebotante
    x += velX; y += velY;
    if(x <= 0 || x >= window.innerWidth - 70) velX *= -1;
    if(y <= 100 || y >= window.innerHeight - 100) velY *= -1;

    // Estados emocionales
    if(energy < 30) mood = "😴";
    else if(energy > 80) mood = "😸";
    else mood = "😊";

    petEl.style.left = x + 'px';
    petEl.style.top = y + 'px';
    petEl.innerText = mood;
    
    energy -= 0.05; // Se cansa con el tiempo
    requestAnimationFrame(updatePet);
}

// Reacciona al click (Felicidad)
petEl.onclick = () => {
    energy = 100;
    mood = "💖";
    petEl.style.transform = "scale(1.4)";
    setTimeout(() => petEl.style.transform = "scale(1)", 500);
};

// Reacciona si el usuario se va (Tristeza simulada al dejar de mover el mouse)
let idleTimer;
window.onmousemove = () => {
    clearTimeout(idleTimer);
    if(mood === "😢") mood = "😊";
    idleTimer = setTimeout(() => { mood = "😢"; }, 10000); 
};

updatePet();
