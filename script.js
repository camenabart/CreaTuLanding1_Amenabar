// Lista de productos disponibles
// Aquí guardo las flores que están disponibles en la tienda con su id, nombre y precio
let flores = [
  { id: 1, nombre: "Rosas Rojas", precio: 5000 },
  { id: 2, nombre: "Tulipanes", precio: 4500 },
  { id: 3, nombre: "Lirios", precio: 4000 },
  { id: 4, nombre: "Margaritas", precio: 3000 }
];

// Carrito vacío
// Acá se van a ir agregando las flores que el cliente seleccione
let carrito = [];

// Función para agregar flores al carrito
function agregarAlCarrito(idProducto) {
  // Busco la flor por su ID en la lista de flores
  let florSeleccionada = flores.find(flor => flor.id === idProducto);
  
  if (florSeleccionada) {
    // Si la flor existe, la agrego al carrito
    carrito.push(florSeleccionada);
    actualizarCarrito();  // Actualizo el carrito para reflejar los cambios
  } else {
    // Si no encuentro el producto, muestro un mensaje
    alert("🚫 Ups, no encontramos el producto.");
  }
}

// Función para mostrar el carrito de compras
function mostrarCarrito() {
  // Obtengo los elementos HTML donde se va a mostrar la info
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const carritoVacio = document.getElementById('carrito-vacio');
  
  listaCarrito.innerHTML = '';  // Limpiar la lista de productos antes de mostrar los nuevos
  
  if (carrito.length === 0) {
    // Si el carrito está vacío, muestro el mensaje de "carrito vacío"
    carritoVacio.style.display = 'block';
    totalCarrito.textContent = '💰 Total: $0';  // Muestro el total como 0 si está vacío
    return;
  }

  carritoVacio.style.display = 'none';  // Si no está vacío, oculto el mensaje de carrito vacío
  
  let total = 0;  // Aquí vamos a sumar el total de las flores en el carrito
  carrito.forEach(flor => {
    total += flor.precio;  // Vamos sumando el precio de cada flor
    const li = document.createElement('li');
    li.textContent = `${flor.nombre} - $${flor.precio}`;  // Muestro el nombre y precio de la flor
    listaCarrito.appendChild(li);  // Agrego cada flor a la lista del carrito
  });

  // Muestro el total acumulado
  totalCarrito.textContent = `💰 Total: $${total}`;
}

// Función para actualizar la lista de productos en la página
function actualizarProductos() {
  // Busco el contenedor donde quiero mostrar los productos
  const productosDiv = document.getElementById('productos');
  
  flores.forEach(flor => {
    // Para cada flor, creo un div con la info de la flor
    const div = document.createElement('div');
    div.className = 'producto';  // Le doy un nombre de clase para los estilos
    div.innerHTML = `
      <h3>${flor.nombre}</h3>
      <p>Precio: $${flor.precio}</p>
      <button onclick="agregarAlCarrito(${flor.id})">Agregar al carrito</button>
    `;
    // Agrego cada producto al contenedor de productos
    productosDiv.appendChild(div);
  });
}

// Llamo a la función para actualizar los productos cuando cargue la página
// Esto muestra todos los productos disponibles al inicio
actualizarProductos();

// Función para actualizar el carrito en la página
function actualizarCarrito() {
  // Cada vez que el carrito cambia, llamo a esta función para mostrar los productos del carrito
  mostrarCarrito();
}
