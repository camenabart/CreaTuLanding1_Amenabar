// Constructor para flores con imagen
function Flor(id, nombre, precio, imagen) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.imagen = imagen;
}

// === Datos iniciales o localStorage ===
const floresGuardadas = JSON.parse(localStorage.getItem("flores"));
const flores = floresGuardadas || [
  new Flor(1, "Rosas Rojas", 5000, "img/rosas.jpg"),
  new Flor(2, "Tulipanes", 4500, "img/rosas.jpg"),
  new Flor(3, "Lirios", 4000, "img/rosas.jpg"),
  new Flor(4, "Margaritas", 3000, "img/rosas.jpg"),
  new Flor(5, "Hortencias", 3500, "img/rosas.jpg"),
  new Flor(6, "Dalias", 6000, "img/rosas.jpg"),
  new Flor(7, "Girasoles", 3500, "img/rosas.jpg"),
  new Flor(8, "Orquídeas", 8000, "img/rosas.jpg"),
  new Flor(9, "Crisantemos", 2800, "img/rosas.jpg"),
  new Flor(10, "Peonías", 7500, "img/rosas.jpg"),
  new Flor(11, "Lavanda", 3200, "img/rosas.jpg"),
  new Flor(12, "Gardenias", 4500, "img/rosas.jpg"),
  new Flor(13, "Rosas Blancas", 4800, "img/rosas.jpg"),
  new Flor(14, "Rosas Rosadas", 5200, "img/rosas.jpg"),
  new Flor(15, "Calas", 5500, "img/rosas.jpg"),
  new Flor(16, "Aster", 3800, "img/rosas.jpg"),
  new Flor(17, "Claveles", 2500, "img/rosas.jpg"),
  new Flor(18, "Gladiolos", 4200, "img/rosas.jpg"),
  new Flor(19, "Iris", 4800, "img/rosas.jpg"),
  new Flor(20, "Narcisos", 3500, "img/rosas.jpg")
];

// Carrito (intenta cargar de localStorage)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// === Funciones de guardado ===
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function guardarFlores() {
  localStorage.setItem("flores", JSON.stringify(flores));
}

// === Mostrar productos ===
const listaProductos = document.getElementById("lista-productos");

// Función para formatear precios
function formatearPrecio(precio) {
  return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function mostrarProductos(productos = flores) {
  listaProductos.innerHTML = "";
  productos.forEach((flor) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${flor.imagen}" alt="${flor.nombre}" class="producto-img" />
      <div class="producto-info">
        <div>
          <h3>${flor.nombre}</h3>
          <p>$${formatearPrecio(flor.precio)}</p>
        </div>
        <button onclick="agregarAlCarrito(${flor.id})">
          <i class="fas fa-shopping-cart"></i>
          Agregar al carrito
        </button>
      </div>
    `;
    listaProductos.appendChild(div);
  });
}

// === Función buscar ===
function buscar() {
  const texto = document.getElementById("buscador").value.toLowerCase().trim();

  if (texto === "") {
    mostrarTodos();
    return;
  }

  // Remover clase activa de todos los botones de categoría
  document.querySelectorAll('.btn-categoria').forEach(btn => {
    btn.classList.remove('activo');
  });

  const resultado = flores.filter((flor) =>
    flor.nombre.toLowerCase().includes(texto)
  );

  if (resultado.length === 0) {
    listaProductos.innerHTML = "<p class='mensaje-no-resultados'>No se encontraron productos con ese nombre.</p>";
  } else {
    mostrarProductos(resultado);
  }
}

// === Mostrar todos ===
function mostrarTodos() {
  document.getElementById("buscador").value = "";
  
  // Remover clase activa de todos los botones de categoría
  document.querySelectorAll('.btn-categoria').forEach(btn => {
    btn.classList.remove('activo');
  });
  
  mostrarProductos(flores);
}

// === Filtrado por categorías ===
function filtrarPorCategoria(categoria) {
  // Remover clase activa de todos los botones
  document.querySelectorAll('.btn-categoria').forEach(btn => {
    btn.classList.remove('activo');
  });
  
  // Agregar clase activa al botón clickeado
  const botonClickeado = document.querySelector(`[onclick="filtrarPorCategoria('${categoria}')"]`);
  if (botonClickeado) {
    botonClickeado.classList.add('activo');
  }

  // Filtrar productos según la categoría
  const resultado = flores.filter((flor) => {
    // Por ahora, todas las flores están en la categoría 'flores'
    // Esto se puede modificar cuando agregues la propiedad categoría a los productos
    return categoria === 'flores';
  });

  if (resultado.length === 0) {
    listaProductos.innerHTML = "<p class='mensaje-no-resultados'>No hay productos en la categoría " + categoria + ".</p>";
  } else {
    mostrarProductos(resultado);
  }
}

// === Funciones mejoradas del carrito ===
function agregarAlCarrito(id) {
  const flor = flores.find((f) => f.id === id);
  const itemEnCarrito = carrito.find((item) => item.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad = (itemEnCarrito.cantidad || 1) + 1;
    mostrarMensajeCarrito(`Aumentaste la cantidad de "${flor.nombre}" en el carrito.`);
  } else {
    carrito.push({ ...flor, cantidad: 1 });
    mostrarMensajeCarrito(`Agregaste "${flor.nombre}" al carrito.`);
  }

  // Animación del carrito
  const carritoIcon = document.querySelector('.carrito-icon');
  carritoIcon.classList.add('animado');
  setTimeout(() => carritoIcon.classList.remove('animado'), 500);

  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();
}

// === Mostrar carrito ===
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const totalCarrito = document.getElementById("total-carrito");
const mensajeCarrito = document.getElementById("mensaje-carrito");
const btnPagar = document.getElementById("btn-pagar");

function mostrarCarrito() {
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    carritoVacio.style.display = "block";
    totalCarrito.textContent = "Total: $0";
    btnPagar.style.display = "none";
    return;
  }

  carritoVacio.style.display = "none";
  btnPagar.style.display = "flex";
  
  // Ordenar carrito por nombre
  carrito.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.className = "item-carrito";
    
    const cantidad = item.cantidad || 1;
    const subtotal = item.precio * cantidad;
    
    li.innerHTML = `
      <div class="item-info">
        <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen" />
        <span class="item-nombre">${item.nombre}</span>
      </div>
      <div class="item-detalles">
        <span class="item-precio-unitario">$${formatearPrecio(item.precio)} c/u</span>
        <div class="item-controles">
          <button onclick="cambiarCantidad(${item.id}, ${cantidad - 1})" class="btn-cantidad" aria-label="Disminuir cantidad">-</button>
          <span class="item-cantidad">${cantidad}</span>
          <button onclick="cambiarCantidad(${item.id}, ${cantidad + 1})" class="btn-cantidad" aria-label="Aumentar cantidad">+</button>
        </div>
        <span class="item-subtotal">$${formatearPrecio(subtotal)}</span>
        <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar" aria-label="Eliminar producto">🗑️</button>
      </div>
    `;
    listaCarrito.appendChild(li);
  });

  const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
  const descuento = localStorage.getItem('descuentoAplicado') ? 0.1 : 0;
  const totalConDescuento = total * (1 - descuento);
  
  totalCarrito.innerHTML = `
    ${descuento > 0 ? `<span class="precio-original">$${formatearPrecio(total)}</span>` : ''}
    <span class="precio-final">Total: $${formatearPrecio(totalConDescuento)}</span>
    ${descuento > 0 ? `<span class="descuento-aplicado">¡10% de descuento aplicado!</span>` : ''}
  `;
  
  actualizarContadorCarrito();
}

function cambiarCantidad(id, nuevaCantidad) {
  if (nuevaCantidad < 1) {
    eliminarDelCarrito(id);
    return;
  }

  const item = carrito.find((item) => item.id === id);
  if (item) {
    const cantidadAnterior = item.cantidad;
    item.cantidad = nuevaCantidad;
    
    guardarCarrito();
    mostrarCarrito();
    
    if (nuevaCantidad > cantidadAnterior) {
      mostrarMensajeCarrito(`Aumentaste la cantidad de "${item.nombre}" a ${nuevaCantidad}`);
    } else {
      mostrarMensajeCarrito(`Disminuiste la cantidad de "${item.nombre}" a ${nuevaCantidad}`);
    }
  }
}

function eliminarDelCarrito(id) {
  const item = carrito.find((item) => item.id === id);
  if (item) {
    carrito = carrito.filter((item) => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
    actualizarContadorCarrito();
    mostrarMensajeCarrito(`Eliminaste "${item.nombre}" del carrito`, "red");
  }
}

function vaciarCarrito() {
  if (carrito.length === 0) {
    mostrarMensajeCarrito("El carrito ya está vacío", "orange");
    return;
  }
  
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    actualizarContadorCarrito();
    mostrarMensajeCarrito("Carrito vaciado", "red");
  }
}

// === Mostrar mensajes ===
function mostrarMensajeCarrito(texto, color = "green") {
  mensajeCarrito.textContent = texto;
  mensajeCarrito.style.color = color;
  setTimeout(() => {
    mensajeCarrito.textContent = "";
  }, 3000);
}

// === Actualizar contador del carrito ===
function actualizarContadorCarrito() {
  const contador = document.getElementById("carrito-count");
  const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
  contador.textContent = totalItems;
}

// === Aplicar descuento ===
const CODIGO_DESCUENTO = "TINEO10"; // Código de descuento válido

function aplicarDescuento() {
  if (carrito.length === 0) {
    mostrarMensajeCarrito("Tu carrito está vacío!", "red");
    return;
  }

  if (localStorage.getItem('descuentoAplicado')) {
    mostrarMensajeCarrito("Ya tienes un descuento aplicado", "orange");
    return;
  }

  const codigoIngresado = prompt("Ingresa el código de descuento:");
  
  if (!codigoIngresado) {
    mostrarMensajeCarrito("Operación cancelada", "orange");
    return;
  }

  if (codigoIngresado.toUpperCase() === CODIGO_DESCUENTO) {
    localStorage.setItem('descuentoAplicado', 'true');
    mostrarCarrito();
    mostrarMensajeCarrito("¡Descuento aplicado con éxito!");
  } else {
    mostrarMensajeCarrito("Código de descuento inválido", "red");
  }
}

document.getElementById("btn-descuento").addEventListener("click", aplicarDescuento);

// === Función para controlar el menú hamburguesa de filtros ===
function toggleFiltros() {
  const filtros = document.getElementById('filtros-mobile');
  filtros.classList.toggle('activo');
}

// === Ir a pagar ===
function irAPagar() {
  if (carrito.length === 0) {
    mostrarMensajeCarrito("Tu carrito está vacío!", "red");
    return;
  }

  const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
  const descuento = localStorage.getItem('descuentoAplicado') ? 0.1 : 0;
  const totalConDescuento = total * (1 - descuento);
  
  const mensaje = `
    Resumen de tu compra:
    ${carrito.map(item => `- ${item.nombre} x${item.cantidad}: $${formatearPrecio(item.precio * item.cantidad)}`).join('\n')}
    ${descuento > 0 ? `\nDescuento aplicado: 10%\nSubtotal: $${formatearPrecio(total)}` : ''}
    Total a pagar: $${formatearPrecio(totalConDescuento)}
    
    ¿Deseas proceder con el pago?
  `;
  
  if (confirm(mensaje)) {
    mostrarMensajeCarrito("¡Gracias por tu compra! Te contactaremos pronto.", "green");
    localStorage.removeItem('descuentoAplicado');
    vaciarCarrito();
  }
}

// === Inicialización ===
window.onload = function() {
  mostrarProductos(flores);
  mostrarCarrito();
  actualizarContadorCarrito();
};

// === Control de navegación móvil ===
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('activo');
}

function toggleCarrito() {
  window.location.href = 'carrito.html';
}

// Cerrar menús al hacer clic fuera
document.addEventListener('click', function(event) {
  const navLinks = document.querySelector('.nav-links');
  const carrito = document.getElementById('carrito');
  const menuBtn = document.querySelector('.menu-hamburguesa');
  const carritoBtn = document.querySelector('.carrito-icon');

  // Cerrar menú de navegación
  if (!menuBtn.contains(event.target) && !navLinks.contains(event.target)) {
    navLinks.classList.remove('activo');
  }

  // Cerrar carrito
  if (!carritoBtn.contains(event.target) && !carrito.contains(event.target)) {
    carrito.classList.remove('activo');
  }
});

// Función para manejar las animaciones de scroll
function handleScrollAnimation() {
  const sections = document.querySelectorAll('.quienes-somos, #productos, .actividades, #ofertas');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('visible');
    }
  });
}

// Agregar el evento de scroll
window.addEventListener('scroll', handleScrollAnimation);

// Ejecutar una vez al cargar la página para las secciones visibles inicialmente
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimation();
});

// Variables para el carrusel
let currentSlide = 0;
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.actividad-card');
const dots = document.querySelectorAll('.dot');
const slideWidth = slides[0].offsetWidth + 20; // Ancho de la tarjeta + gap

// Función para mover el carrusel
function moverCarousel(direction) {
  const maxSlide = slides.length - 1;
  currentSlide = Math.max(0, Math.min(currentSlide + direction, maxSlide));
  actualizarCarrusel();
}

// Función para ir a un slide específico
function irASlide(index) {
  currentSlide = index;
  actualizarCarrusel();
}

// Función para actualizar la posición del carrusel y los indicadores
function actualizarCarrusel() {
  const offset = -currentSlide * slideWidth;
  track.style.transform = `translateX(${offset}px)`;
  
  // Actualizar indicadores
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    // El primer punto es activo para los slides 0 y 1
    // El segundo punto es activo para los slides 2 y 3
    dot.classList.toggle('active', (index === 0 && currentSlide < 2) || (index === 1 && currentSlide >= 2));
  });
}

// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
  actualizarCarrusel();
});

// Variables para los modales
let actividadSeleccionada = null;

// Función para abrir el modal de reserva
function abrirModalReserva(actividad) {
  actividadSeleccionada = actividad;
  const modal = document.getElementById('modal-reserva');
  modal.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal de reserva
function cerrarModalReserva() {
  const modal = document.getElementById('modal-reserva');
  modal.classList.remove('activo');
  document.body.style.overflow = '';
  document.getElementById('formulario-reserva').reset();
  actividadSeleccionada = null;
}

// Función para manejar el envío del formulario
function enviarReserva(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const reserva = {
    actividad: actividadSeleccionada,
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    telefono: formData.get('telefono'),
    fecha: formData.get('fecha'),
    participantes: formData.get('participantes'),
    comentarios: formData.get('comentarios')
  };

  console.log('Reserva recibida:', reserva);
  alert('¡Gracias por tu reserva! Te contactaremos pronto para confirmar los detalles.');
  cerrarModalReserva();
}

// Función para abrir el modal de detalles
function verMasActividad(titulo, descripcion, duracion, participantes, fecha, hora, imagen) {
  actividadSeleccionada = titulo;
  
  // Actualizar el contenido del modal
  document.getElementById('detalle-titulo').textContent = titulo;
  document.getElementById('detalle-descripcion').textContent = descripcion;
  document.getElementById('detalle-duracion').textContent = duracion;
  document.getElementById('detalle-participantes').textContent = `Máx. ${participantes}`;
  document.getElementById('detalle-fecha').textContent = fecha;
  document.getElementById('detalle-hora').textContent = hora;
  document.getElementById('detalle-imagen').src = imagen;
  document.getElementById('detalle-imagen').alt = titulo;

  // Mostrar el modal
  const modal = document.getElementById('modal-detalles');
  modal.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal de detalles
function cerrarModalDetalles() {
  const modal = document.getElementById('modal-detalles');
  modal.classList.remove('activo');
  document.body.style.overflow = '';
  actividadSeleccionada = null;
}

// Función para abrir el modal de reserva desde el modal de detalles
function abrirModalReservaDesdeDetalles() {
  cerrarModalDetalles();
  abrirModalReserva(actividadSeleccionada);
}

// Cerrar modales al hacer clic fuera
document.addEventListener('click', function(event) {
  const modalReserva = document.getElementById('modal-reserva');
  const modalDetalles = document.getElementById('modal-detalles');
  
  if (event.target === modalReserva) {
    cerrarModalReserva();
  }
  if (event.target === modalDetalles) {
    cerrarModalDetalles();
  }
});
