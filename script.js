// Cargar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaCarrito = document.querySelector('.lista-carrito');
const totalElemento = document.getElementById('total');
const carritoDiv = document.getElementById('carrito');
const overlay = document.getElementById('carrito-overlay');
const toggleBtn = document.getElementById('toggle-carrito');
const contadorCarrito = document.getElementById('contador-carrito');

// Mostrar u ocultar el carrito como modal
toggleBtn.addEventListener('click', () => {
  carritoDiv.classList.toggle('mostrar');
  overlay.classList.toggle('mostrar');
});

// Cerrar al hacer clic en el overlay oscuro
overlay.addEventListener('click', () => {
  carritoDiv.classList.remove('mostrar');
  overlay.classList.remove('mostrar');
});

// Mostrar notificación flotante
function mostrarNotificacion() {
  const noti = document.getElementById('notificacion');
  noti.classList.add('mostrar');
  noti.classList.remove('oculto');
  setTimeout(() => {
    noti.classList.remove('mostrar');
    noti.classList.add('oculto');
  }, 2000);
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardarCarrito();
  actualizarCarrito();
  mostrarNotificacion();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Eliminar producto individual
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Vaciar carrito completo
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

// Finalizar compra (resetea carrito)
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("¡Gracias por tu compra! Nos pondremos en contacto contigo pronto.");
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

// Mostrar productos en pantalla y total
function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toFixed(2)}
      <button onclick="eliminarDelCarrito(${index})">X</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio;
  });

  totalElemento.textContent = total.toFixed(2);
  actualizarContadorCarrito();
}

// Actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
  if (contadorCarrito) {
    contadorCarrito.textContent = `(${carrito.length})`;
  }
}

// Render inicial
actualizarCarrito();
