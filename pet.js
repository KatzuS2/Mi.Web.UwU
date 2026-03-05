const pet = document.getElementById('pet');
let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
let x = tx, y = ty;

function movePet() {
    // Velocidad ultra lenta (0.008)
    x += (tx - x) * 0.008; 
    y += (ty - y) * 0.008;
    
    pet.style.left = `${x}px`;
    pet.style.top = `${y}px`;

    // Girar suavemente
    pet.style.transform = tx > x ? 'scaleX(-1)' : 'scaleX(1)';

    if (Math.abs(tx - x) < 10) {
        setTimeout(() => {
            tx = Math.random() * (window.innerWidth - 100);
            ty = Math.random() * (window.innerHeight - 250) + 100;
        }, 2000);
    }
    requestAnimationFrame(movePet);
}

// Marquesina inferior (Bucle de tecnologías)
const techs = ["HTML5", "CSS3", "JAVASCRIPT", "PYTHON", "REACT", "NODE.JS", "LINUX"];
const marquee = document.getElementById('marquee');
marquee.innerHTML = techs.map(t => `<span style="margin-right:50px; color:var(--blue)">${t}</span>`).join('').repeat(3);

movePet();
