const pet = document.getElementById('pet');
const clock = document.getElementById('clock');

// 1. Caminata del Zorrito por la pantalla
function walk() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 200) + 100;
    
    pet.style.left = `${x}px`;
    pet.style.top = `${y}px`;
    
    // Girar según dirección
    const currentX = parseFloat(pet.style.left);
    pet.style.transform = x > currentX ? 'scaleX(-1)' : 'scaleX(1)';
    
    setTimeout(walk, Math.random() * 4000 + 3000);
}

// 2. Reloj funcional del reproductor (Exacto image_4.png)
function updateClock() {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', hour12: true 
    });
}

// 3. Interacción con el Chat (Integración de personalidad)
pet.onclick = () => {
    pet.style.boxShadow = "0 0 30px #ff33cc";
    setTimeout(() => pet.style.boxShadow = "0 0 15px #33ccff", 500);
    console.log("¡El zorrito te saluda! (◕ᴥ◕)");
};

// Iniciar funciones
walk();
updateClock();
setInterval(updateClock, 1000);
