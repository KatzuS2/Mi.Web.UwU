
const pet = document.getElementById('pet');
let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
let cx = tx, cy = ty;

function moveCyberfox() {
    cx += (tx - cx) * 0.015;
    cy += (ty - cy) * 0.015;
    pet.style.left = `${cx}px`;
    pet.style.top = `${cy}px`;
    const float = Math.sin(Date.now() * 0.003) * 10;
    pet.style.transform = `translate(-50%, -50%) translateY(${float}px)`;
    if (Math.abs(tx - cx) < 15) {
        setTimeout(() => {
            tx = Math.random() * (window.innerWidth - 150) + 75;
            ty = Math.random() * (window.innerHeight - 300) + 150;
        }, 2000);
    }
    requestAnimationFrame(moveCyberfox);
}

const techs = [
    {n:"JS", i:"🟨"}, {n:"HTML5", i:"🟧"}, {n:"CSS3", i:"🟦"}, {n:"PYTHON", i:"🐍"}, 
    {n:"REACT", i:"⚛️"}, {n:"LINUX", i:"🐧"}, {n:"GITHUB", i:"🐙"}, {n:"NODE.JS", i:"🟢"}
];

const track = document.getElementById('iconTrack');
const content = techs.map(t => `<div class="tech-item"><span>${t.i}</span> <span>${t.n}</span></div>`).join('');
track.innerHTML = content + content + content; // Loop perfecto sin saltos

moveCyberfox();
