
const chatWindow = document.getElementById('chatWindow');
const petEl = document.createElement('div');
petEl.className = 'cyber-zorro';
document.body.appendChild(petEl);

let x = 100, y = 300;
let velX = 1.5, velY = 1.0;
let isBlinking = false;
let direction = 1;

function updatePet() {
    // Movimiento rebotante por la pantalla
    x += velX; y += velY;
    if(x <= 0 || x >= window.innerWidth - 60) {
        velX *= -1; direction *= -1;
    }
    if(y <= 100 || y >= window.innerHeight - 80) velY *= -1;

    petEl.style.left = x + 'px';
    petEl.style.top = y + 'px';
    petEl.style.transform = `scaleX(${direction})`; // Voltear cuando cambia de dirección

    // Pestañeo aleatorio
    if(Math.random() < 0.005) blink();

    // "Maullido" aleatorio en el chat
    if(Math.random() < 0.001) meow();
    
    requestAnimationFrame(updatePet);
}

function meow() {
    // Usamos appendMessage de script.js, asegurándonos de que esté disponible
    if (typeof appendMessage === 'function') {
        appendMessage('miau!', 'ai');
    }
}

function blink() {
    petEl.classList.add('blinking');
    setTimeout(() => petEl.classList.remove('blinking'), 150);
}

updatePet();
