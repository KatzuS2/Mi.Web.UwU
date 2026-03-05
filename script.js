// Partículas de 0 y 1 al mover el mouse
document.addEventListener('mousemove', (e) => {
    const p = document.createElement('span');
    p.className = 'particle';
    p.innerText = Math.round(Math.random());
    p.style.left = e.pageX + 'px';
    p.style.top = e.pageY + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
});

// IA de Cyberfox con Wikipedia
async function sendToIA() {
    const input = document.getElementById('userInput');
    const display = document.getElementById('chatDisplay');
    const query = input.value.trim();
    if(!query) return;

    display.innerHTML += `<div>> ${query}</div>`;
    input.value = '';

    try {
        const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await res.json();
        const responseText = data.extract || "¡Miau! No encontré eso en mis circuitos de Wikipedia.";
        display.innerHTML += `<div style="color:var(--blue)">Cyberfox: ${responseText}</div>`;
    } catch {
        display.innerHTML += `<div>Error de conexión...</div>`;
    }
    display.scrollTop = display.scrollHeight;
}

// Reloj
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}, 1000);
