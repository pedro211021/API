let usuarios = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let vistos = JSON.parse(localStorage.getItem("vistos")) || [];

// =====================================
// Cargar datos desde la API
// =====================================
async function cargarUsuarios() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    usuarios = await res.json();
    mostrarLista(usuarios);
}
cargarUsuarios();

// =====================================
// Mostrar Perfil
// =====================================
function mostrarDatos() {
    const app = document.getElementById("app");
    const user = usuarios[0];
    if(!user) return;

    app.innerHTML = `
        <div class="card">
            <h2>Mi Perfil</h2>
            <p><strong>${user.name}</strong></p>
            <p>Usuario: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Ciudad: ${user.address.city}</p>
        </div>
    `;
}

// =====================================
// Mostrar lista de usuarios
// =====================================
function mostrarLista(lista = usuarios) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const buscador = document.createElement("input");
    buscador.placeholder = "Buscar usuario...";
    buscador.classList.add("c-buscador");
    buscador.addEventListener("input", (e) => buscar(e, lista));

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");
    contenedor.innerHTML = generarLista(lista);

    app.appendChild(buscador);
    app.appendChild(contenedor);
}

function generarLista(lista) {
    let html = "";
    lista.forEach(u => {
        html += `
            <div class="card" onclick="mostrarDetalle(${u.id})">
                <h3>${u.name}</h3>
                <p>${u.email}</p>
                <p>${u.username}</p>
            </div>
        `;
    });
    return html;
}

// =====================================
// Mostrar Aleatorio
// =====================================
function mostrarAleatorio() {
    const app = document.getElementById("app");
    const random = usuarios[Math.floor(Math.random() * usuarios.length)];
    if(!random) return;

    app.innerHTML = `
        <div class="card">
            <h2>Usuario Aleatorio</h2>
            <p><strong>${random.name}</strong></p>
            <p>Email: ${random.email}</p>
        </div>
    `;
}

// =====================================
// Favoritos
// =====================================
function toggleFavorito(id, nombre) {
    const existe = favoritos.some(f => f.id === id);
    if (existe) {
        favoritos = favoritos.filter(f => f.id !== id);
    } else {
        favoritos.push({ id, nombre });
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarDetalle(id);
}

function mostrarFavoritos() {
    const app = document.getElementById("app");
    let html = "";
    favoritos.forEach(f => {
        const u = usuarios.find(x => x.id === f.id);
        if(u){
            html += `
                <div class="card" onclick="mostrarDetalle(${u.id})">
                    <h3>${u.name}</h3>
                    <p>${u.email}</p>
                </div>
            `;
        }
    });
    app.innerHTML = `<section class="c-lista">${html}</section>`;
}

// =====================================
// Vistos
// =====================================
function mostrarDetalle(id) {
    const u = usuarios.find(x => x.id === id);
    if(!u) return;

    if(!vistos.includes(id)) {
        vistos.push(id);
        localStorage.setItem("vistos", JSON.stringify(vistos));
    }

    const esFav = favoritos.some(f => f.id === id);
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="card">
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

function mostrarVistos() {
    const app = document.getElementById("app");
    let html = "";
    vistos.forEach(id => {
        const u = usuarios.find(x => x.id === id);
        if(u){
            html += `
                <div class="card" onclick="mostrarDetalle(${u.id})">
                    <h3>${u.name}</h3>
                    <p>${u.email}</p>
                </div>
            `;
        }
    });
    app.innerHTML = `<section class="c-lista">${html}</section>`;
}

// =====================================
// Buscar
// =====================================
function buscar(e, lista){
    const filtro = e.target.value.toLowerCase();
    const filtrados = lista.filter(u => 
        u.name.toLowerCase().includes(filtro) ||
        u.username.toLowerCase().includes(filtro) ||
        u.email.toLowerCase().includes(filtro)
    );
    mostrarLista(filtrados);
}
