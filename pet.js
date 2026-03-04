// Crear el elemento de la mascota asegurando visibilidad
let petEl = document.querySelector('.cyber-zorro');
if (!petEl) {
    petEl = document.createElement('div');
    petEl.className = 'cyber-zorro';
    petEl.innerHTML = '<div class="ears"><div class="ear"></div><div class="ear"></div></div>';
    document.body.appendChild(petEl);
}

// Posición inicial centrada
let posX = window.innerWidth / 2 - 50;
let posY = window.innerHeight / 2 - 50;
let speedX = 2.0;
let speedY = 1.5;
let zorroDir = 1;

function moveZorro() {
    posX += speedX;
    posY += speedY;

    // Rebote en bordes (ajustado para el nuevo tamaño)
    if (posX <= 0 || posX >= window.innerWidth - 100) {
        speedX *= -1;
        zorroDir *= -1;
    }
    if (posY <= 60 || posY >= window.innerHeight - 150) { // No bajar hasta la marquesina tech
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

    // Maullido aleatorio en el chat
    if (Math.random() < 0.0015 && typeof appendMessage === 'function') {
        appendMessage('miau! (◕ᴥ◕) #TechFox', 'ai');
    }

    requestAnimationFrame(moveZorro);
}

// Iniciar movimiento automático
moveZorro();

// Reacción al Clic: Purr y aceleración temporal
petEl.onclick = () => {
    speedX *= 2; speedY *= 2;
    if (typeof appendMessage === 'function') appendMessage('¡Purr! 💖 Me encanta la tecnología.', 'ai');
    setTimeout(() => { speedX /= 2; speedY /= 2; }, 1500);
};
