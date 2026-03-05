// Configuración de la mascota (Zorrito Ciber-Kawaii)
const petEl = document.getElementById('pet');

// Variables de movimiento
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velX = 1.8;
let velY = 1.2;
let zorroDir = 1;

// Estados de ánimo para el chat
const petMoods = {
    happy: "¡Miau! Estoy muy feliz hoy. (◕ᴥ◕) ✨",
    hungry: "Mis circuitos tienen hambre... ¿me das unos bits? 🔋",
    excited: "¡Wiii! ¡Me encanta moverme por tu pantalla! 🚀",
    sleepy: "Zzz... el modo ahorro de energía me llama. 😴"
};

function animatePet() {
    // Actualizar posición
    posX += velX;
    posY += velY;

    // Rebote en los bordes de la pantalla
    if (posX <= 0 || posX >= window.innerWidth - 90) {
        velX *= -1;
        zorroDir *= -1; // Voltear hacia donde camina
    }
    if (posY <= 80 || posY >= window.innerHeight - 90) { // Margen para el reproductor y marquesina
        velY *= -1;
    }

    // Aplicar estilos de posición y dirección
    petEl.style.left = posX + 'px';
    petEl.style.top = posY + 'px';
    petEl.style.transform = `scaleX(${zorroDir})`;

    // Parpadeo aleatorio (basado en image_1.png/image_3.png)
    if (Math.random() < 0.008) {
        petEl.classList.add('blinking');
        setTimeout(() => petEl.classList.remove('blinking'), 150);
    }

    // Comentario aleatorio en el chat de vez en cuando
    if (Math.random() < 0.0005) {
        const randomMood = Object.values(petMoods)[Math.floor(Math.random() * 4)];
        appendMessage(randomMood, 'ai');
    }

    requestAnimationFrame(animatePet);
}

// Iniciar animación al cargar
animatePet();

// Interacción: Clic para "alimentar" o jugar
petEl.onclick = () => {
    velX *= 1.5;
    velY *= 1.5;
    appendMessage("¡Eso hace cosquillas! ¡Mira qué rápido voy! 💖", "ai");
    
    // Volver a velocidad normal después de un momento
    setTimeout(() => {
        velX /= 1.5;
        velY /= 1.5;
    }, 2000);
};
