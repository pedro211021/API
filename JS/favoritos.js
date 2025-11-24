let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function toggleFavorito(id, nombre) {
    const existe = favoritos.some(f => f.id == id);

    if (existe) {
        favoritos = favoritos.filter(f => f.id != id);
    } else {
        favoritos.push({ id, nombre });
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("Favoritos actualizado");
}

function mostrarFavoritos() {
    const app = document.getElementById("app");

    if (favoritos.length === 0) {
        app.innerHTML = "<h3>No tienes favoritos aún</h3>";
        return;
    }

    let html = "<h2>Favoritos</h2>";
    favoritos.forEach(f => {
        html += `
            <div class="c-card" onclick="mostrarDetalle(${f.id})">
                ⭐ ${f.nombre}
            </div>
        `;
    });

    app.innerHTML = html;
}
