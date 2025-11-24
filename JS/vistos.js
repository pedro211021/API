let vistos = JSON.parse(localStorage.getItem("vistos")) || [];

function marcarVisto(id) {
    if (!vistos.includes(id)) {
        vistos.push(id);
        localStorage.setItem("vistos", JSON.stringify(vistos));
    }
}

function mostrarVistos() {
    const app = document.getElementById("app");
    let html = "";
    vistos.forEach(id => {
        const u = usuarios.find(x => x.id === id);
        html += `
            <div class="c-card" onclick="mostrarDetalle(${u.id})">
                <h3>${u.name}</h3>
                <p>${u.email}</p>
            </div>
        `;
    });
    app.innerHTML = `<section class="c-lista">${html}</section>`;
}
