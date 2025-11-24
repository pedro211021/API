function mostrarAleatorio() {
    if (usuarios.length === 0) return;
    const random = usuarios[Math.floor(Math.random() * usuarios.length)];
    const app = document.getElementById("app");
    app.innerHTML = `
        <h2>Usuario Aleatorio</h2>
        <div class="c-card">
            <strong>${random.name}</strong><br>
            Email: ${random.email}
        </div>
    `;
}
