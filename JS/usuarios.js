let usuarios = [];

async function cargarUsuarios() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    usuarios = await res.json();
}
cargarUsuarios();
