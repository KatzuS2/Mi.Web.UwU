window.onload = () => {
    const bg = document.getElementById('binaryBg');
    bg.innerText = Array(2500).fill(0).map(() => Math.round(Math.random())).join(' ');
};

function playMusic() {
    const link = document.getElementById('ytLink').value;
    const container = document.getElementById('videoContainer');
    const timer = document.getElementById('timer');
    const vContainer = document.getElementById('v-bars');
    const bars = document.querySelectorAll('.v-bar');
    
    const id = link.includes('v=') ? link.split('v=')[1].split('&')[0] : link;

    if(id) {
        container.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay"></iframe>`;
        
        // Activar Visualizer
        vContainer.classList.add('active');
        bars.forEach(bar => {
            bar.style.animationDuration = `${0.3 + (Math.random() * 0.5)}s`;
            bar.classList.add('animating');
        });

        let p = 0;
        timer.innerText = "STREAMING_ACTIVE";
        
        const progressInterval = setInterval(() => { 
            if(p < 100) { 
                p += 0.5; 
                document.getElementById('pBar').style.width = p + '%'; 
            } else {
                clearInterval(progressInterval);
                timer.innerText = "STREAM_FINISHED";
                vContainer.classList.remove('active');
                bars.forEach(b => b.classList.remove('animating'));
            }
        }, 1000);
    } else {
        timer.innerText = "ERROR: INVALID_LINK";
    }
}

async function askWiki() {
    const query = document.getElementById('userInput').value;
    const log = document.getElementById('chatDisplay');
    if(!query) return;
    try {
        const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await res.json();
        log.innerHTML += `<div style="color:var(--cyan)">> ARCHIVE: ${data.extract || 'NO DATA'}</div>`;
    } catch { log.innerHTML += `<div>Error...</div>`; }
    log.scrollTop = log.scrollHeight;
}

function talkToFox() {
    const log = document.getElementById('chatDisplay');
    const msgs = ["SYNC: COOL_NEON_ACTIVE", "PARTICLES: HYPER_FLUID", "FOX: READY TO DEPLOY"];
    log.innerHTML += `<div style="color:var(--pink)">> FOX: ${msgs[Math.floor(Math.random()*msgs.length)]}</div>`;
    log.scrollTop = log.scrollHeight;
}

document.addEventListener('mousemove', (e) => {
    const p = document.createElement('span');
    p.innerText = Math.round(Math.random());
    p.style.cssText = `position: fixed; left: ${e.clientX}px; top: ${e.clientY}px; color: #fff; text-shadow: 0 0 10px #fff; pointer-events: none; font-size: 14px; z-index: 2000; font-family: 'Orbitron', sans-serif;`;
    document.body.appendChild(p);
    const anim = p.animate([{ opacity: 1, transform: 'scale(1) translateY(0)' }, { opacity: 0, transform: `scale(0.5) translateY(-25px)` }], { duration: 400, easing: 'ease-out' });
    anim.onfinish = () => p.remove();
});