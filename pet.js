const pet = document.getElementById('pet');
let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
let x = tx, y = ty;

function updatePet() {
    // Movimiento fluido (Lerp)
    x += (tx - x) * 0.025;
    y += (ty - y) * 0.025;
    
    pet.style.left = `${x}px`;
    pet.style.top = `${y}px`;

    // Orientación visual según destino
    pet.style.transform = tx > x ? 'scaleX(-1)' : 'scaleX(1)';

    // Buscar nuevo destino al llegar
    if (Math.abs(tx - x) < 8 && Math.abs(ty - y) < 8) {
        setTimeout(() => {
            tx = Math.random() * (window.innerWidth - 110);
            ty = Math.random() * (window.innerHeight - 200) + 60;
        }, Math.random() * 3500 + 1500);
    }
    requestAnimationFrame(updatePet);
}

// Interacción táctil
pet.onclick = () => {
    pet.style.filter = "brightness(1.5)";
    console.log("¡Zorrito activado! (◕ᴥ◕)");
    setTimeout(() => pet.style.filter = "brightness(1)", 600);
};

updatePet();
