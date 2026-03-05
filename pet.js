const pet = document.getElementById('pet');

// Configuración de movimiento
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let targetX = posX;
let targetY = posY;
let vel = 0.02; // Velocidad de desplazamiento suave

function updatePetPosition() {
    // Suavizado de movimiento (Lerp)
    posX += (targetX - posX) * vel;
    posY += (targetY - posY) * vel;

    pet.style.left = `${posX}px`;
    pet.style.top = `${posY}px`;

    // Girar el zorrito según la dirección a la que va
    if (Math.abs(targetX - posX) > 1) {
        pet.style.transform = targetX > posX ? 'scaleX(-1)' : 'scaleX(1)';
    }

    // Si llegó cerca del destino, buscar uno nuevo
    if (Math.abs(targetX - posX) < 5 && Math.abs(targetY - posY) < 5) {
        setNewTarget();
    }

    requestAnimationFrame(updatePetPosition);
}

function setNewTarget() {
    // Definir límites para que no se salga ni tape el reproductor (bottom: 75px)
    const margin = 100;
    targetX = Math.random() * (window.innerWidth - margin);
    targetY = Math.random() * (window.innerHeight - margin - 150) + 50;
    
    // Tiempo de espera aleatorio antes de volver a caminar
    vel = 0; 
    setTimeout(() => {
        vel = 0.02;
    }, Math.random() * 3000 + 2000);
}

// Interacción: Al hacer clic, el zorrito se emociona
pet.addEventListener('click', () => {
    // Efecto visual de emoción (brillo neón intenso)
    pet.style.boxShadow = "0 0 40px #ff33cc, inset 0 0 20px #ff33cc";
    
    // Si tienes la función de chat, el zorrito responde
    if (typeof appendMessage === 'function') {
        const frases = [
            "¡Bip-bup! Me gustan tus clics. (◕ᴥ◕)",
            "¡Energía al 100%! 🔋✨",
            "¿Estamos escuchando Neon Dreams? 🎶",
            "¡Miau! Digo... ¡Protocolo de felicidad activado!"
        ];
        const randomFrase = frases[Math.floor(Math.random() * frases.length)];
        appendMessage(randomFrase, "ai");
    }

    setTimeout(() => {
        pet.style.boxShadow = "0 0 15px #33ccff";
    }, 1000);
});

// Iniciar el ciclo de vida del zorrito
setNewTarget();
updatePetPosition();
