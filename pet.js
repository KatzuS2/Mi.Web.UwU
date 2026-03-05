const pet = document.createElement('div');
pet.className = 'cyber-zorro';
pet.innerHTML = '<div class="ears"><div class="ear"></div><div class="ear"></div></div>';
document.body.appendChild(pet);

let px = 200, py = 200, vx = 2, vy = 1.5;

function animatePet() {
    px += vx; py += vy;
    if(px <= 0 || px >= window.innerWidth - 80) vx *= -1;
    if(py <= 60 || py >= window.innerHeight - 100) vy *= -1;

    pet.style.left = px + 'px';
    pet.style.top = py + 'px';
    pet.style.transform = `scaleX(${vx > 0 ? 1 : -1})`;

    if(Math.random() < 0.01) {
        pet.classList.add('blinking');
        setTimeout(() => pet.classList.remove('blinking'), 150);
    }
    requestAnimationFrame(animatePet);
}
animatePet();

// Si haces clic, salta de alegría
pet.onclick = () => {
    vx *= 2; vy *= 2;
    setTimeout(() => { vx /= 2; vy /= 2; }, 1000);
    if(typeof appendMessage === 'function') appendMessage("¡Miau! ¡Eso hace cosquillas! 💖", "ai");
};
