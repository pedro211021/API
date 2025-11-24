function mostrarDetalle(id) {
    const u = usuarios.find(x => x.id === id);
    if (!u) return;
    marcarVisto(id);
    const esFav = favoritos.some(f => f.id === id);
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="c-card">
            <h2>${u.name}</h2>
            <p>Usuario: ${u.username}</p>
            <p>Email: ${u.email}</p>
            <p>Teléfono: ${u.phone}</p>
            <p>Website: ${u.website}</p>
            <hr>
            <h3>Empresa</h3>
            <p>${u.company.name}</p>
            <hr>
            <span class="favorito" onclick="toggleFavorito(${u.id}, '${u.name}')">
                ${esFav ? "❤️" : "🤍"}
            </span> Favorito
        </div>
    `;
}
