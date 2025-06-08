const productos = [
  { id: 1, nombre: "Camisa", precio: 25, imagen: "img/camiseta.jpeg" },
  { id: 2, nombre: "Pantalón", precio: 40, imagen: "img/pantalon.jpeg" },
  { id: 3, nombre: "Zapatos", precio: 60, imagen: "img/zapatos.jpeg" },
  { id: 4, nombre: "Gorra", precio: 15, imagen: "img/gorra.jpeg" },
  { id: 5, nombre: "Chaqueta", precio: 80, imagen: "img/chaqueta.jpeg" }
];

let carrito = {};

function renderProductos() {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';
  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card producto">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body text-center">
            <h5>${p.nombre}</h5>
            <p>$${p.precio}</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Agregar</button>
          </div>
        </div>
      </div>
    `;
  });
}

function agregarAlCarrito(id) {
  if (carrito[id]) {
    carrito[id].cantidad++;
  } else {
    const producto = productos.find(p => p.id === id);
    carrito[id] = { ...producto, cantidad: 1 };
  }
  renderCarrito();
}

function modificarCantidad(id, cambio) {
  if (carrito[id]) {
    carrito[id].cantidad += cambio;
    if (carrito[id].cantidad <= 0) {
      delete carrito[id];
    }
    renderCarrito();
  }
}

function renderCarrito() {
  const contenedor = document.getElementById('carrito');
  contenedor.innerHTML = '';
  let total = 0;
  Object.values(carrito).forEach(p => {
    total += p.precio * p.cantidad;
    contenedor.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${p.nombre} x ${p.cantidad}
        <div>
          <button class="btn btn-sm btn-danger" onclick="modificarCantidad(${p.id}, -1)">-</button>
          <button class="btn btn-sm btn-success" onclick="modificarCantidad(${p.id}, 1)">+</button>
        </div>
      </li>
    `;
  });
  document.getElementById('total').innerText = total;
}

renderProductos();
