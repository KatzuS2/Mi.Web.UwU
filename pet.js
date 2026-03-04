// Crear el elemento de la mascota si no existe
let petEl = document.querySelector('.cyber-zorro');
if (!petEl) {
    petEl = document.createElement('div');
    petEl.className = 'cyber-zorro';
    petEl.innerHTML = '<div class="ears"><div class="ear"></div><div class="ear"></div></div><div class="nose"></div>';
    document.body.appendChild(petEl);
}

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let speedX = 2.5;
let speedY = 1.8;
let zorroDir = 1;

function moveZorro() {
    posX += speedX;
    posY += speedY;

    // Rebote en bordes
    if (posX <= 0 || posX >= window.innerWidth - 80) {
        speedX *= -1;
        zorroDir *= -1;
    }
    if (posY <= 50 || posY >= window.innerHeight - 80) {
        speedY *= -1;
    }

    // Aplicar posición y dirección
    petEl.style.left = posX + 'px';
    petEl.style.top = posY + 'px';
    petEl.style.transform = `scaleX(${zorroDir})`;

    // Pestañeo aleatorio
    if (Math.random() < 0.01) {
        petEl.classList.add('blinking');
        setTimeout(() => petEl.classList.remove('blinking'), 150);
    }

    // Maullido aleatorio (solo si existe la función appendMessage)
    if (Math.random() < 0.002 && typeof appendMessage === 'function') {
        appendMessage('miau! (◕ᴥ◕)', 'ai');
    }

    requestAnimationFrame(moveZorro);
}

// Iniciar movimiento
moveZorro();

// Hacer que reaccione al clic
petEl.onclick = () => {
    speedX *= 1.5; // Se emociona y corre más rápido
    speedY *= 1.5;
    if (typeof appendMessage === 'function') appendMessage('¡Purr! 💖', 'ai');
    setTimeout(() => { speedX /= 1.5; speedY /= 1.5; }, 2000);
};
