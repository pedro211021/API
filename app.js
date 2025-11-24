let miUsuario = null;

// Cargar mi perfil desde la API
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
    .then(data => {
        miUsuario = data;
    });
async function mostrarDatos() {

    const app = document.getElementById("app");
    app.innerHTML = `<div class="c-card"><h3>Cargando...</h3></div>`;

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const user = await res.json();

        app.innerHTML = `
            <div class="perfil-card">
                <h2>👤 Mi Perfil</h2>
                <p><strong>Nombre:</strong> ${user.name}</p>
                <p><strong>Usuario:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Ciudad:</strong> ${user.address.city}</p>
                <p><strong>Teléfono:</strong> ${user.phone}</p>
                <p><strong>Compañía:</strong> ${user.company.name}</p>
            </div>
        `;
        
    } catch (e) {
        app.innerHTML = `
            <div class="perfil-card">
                <h3>Error cargando el perfil</h3>
            </div>
        `;
    }
}
