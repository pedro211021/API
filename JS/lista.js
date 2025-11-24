function mostrarLista() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const buscador = document.createElement("input");
    buscador.placeholder = "Buscar usuario...";
    buscador.classList.add("c-buscador");
    buscador.addEventListener("input", (e) => buscar(e, usuarios));

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");
    contenedor.innerHTML = generarLista(usuarios);

    app.appendChild(buscador);
    app.appendChild(contenedor);
}

function generarLista(lista) {
    let html = "";

    lista.forEach(u => {
        html += `
            <div class="c-card" data-id="${u.id}">
                <h3>${u.name}</h3>
                <p>${u.email}</p>
                <p>${u.username}</p>

                <button class="btn-fav" 
                        data-id="${u.id}" 
                        data-nombre="${u.name}">
                    ❤️ Agregar a Favoritos
                </button>
            </div>
        `;
    });

    // Eventos
    setTimeout(() => {
        document.querySelectorAll(".c-card").forEach(card => {
            card.addEventListener("click", () => {
                mostrarDetalle(card.dataset.id);
            });
        });

        document.querySelectorAll(".btn-fav").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleFavorito(btn.dataset.id, btn.dataset.nombre);
            });
        });
    }, 0);

    return html;
}
