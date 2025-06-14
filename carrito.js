// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const subtotalElement = document.getElementById("subtotal");
const descuentoElement = document.getElementById("descuento");
const totalElement = document.getElementById("total");
const formularioPago = document.getElementById("formulario-pago");
const metodoPagoSelect = document.getElementById("metodo-pago");
const datosTarjeta = document.getElementById("datos-tarjeta");

// Función para formatear precios
function formatearPrecio(precio) {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Mostrar items del carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacio.style.display = "block";
        actualizarResumen(0, 0);
        return;
    }

    carritoVacio.style.display = "none";
    
    // Ordenar carrito por nombre
    carrito.sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    carrito.forEach((item) => {
        const div = document.createElement("div");
        div.className = "item-carrito";
        
        const cantidad = item.cantidad || 1;
        const subtotal = item.precio * cantidad;
        
        div.innerHTML = `
            <div class="item-info">
                <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen">
                <div class="item-detalles">
                    <h3>${item.nombre}</h3>
                    <p class="precio-unitario">$${formatearPrecio(item.precio)} c/u</p>
                </div>
            </div>
            <div class="item-controles">
                <div class="cantidad-controls">
                    <button onclick="cambiarCantidad(${item.id}, ${cantidad - 1})" class="btn-cantidad">-</button>
                    <span class="cantidad">${cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, ${cantidad + 1})" class="btn-cantidad">+</button>
                </div>
                <div class="item-subtotal">
                    <span>$${formatearPrecio(subtotal)}</span>
                    <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        listaCarrito.appendChild(div);
    });

    actualizarResumen();
}

// Actualizar resumen de compra
function actualizarResumen() {
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
    const descuento = localStorage.getItem('descuentoAplicado') ? subtotal * 0.1 : 0;
    const total = subtotal - descuento;

    subtotalElement.textContent = `$${formatearPrecio(subtotal)}`;
    descuentoElement.textContent = `$${formatearPrecio(descuento)}`;
    totalElement.textContent = `$${formatearPrecio(total)}`;
}

// Cambiar cantidad de items
function cambiarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        eliminarDelCarrito(id);
        return;
    }

    const item = carrito.find((item) => item.id === id);
    if (item) {
        item.cantidad = nuevaCantidad;
        guardarCarrito();
        mostrarCarrito();
    }
}

// Eliminar item del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter((item) => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Aplicar descuento
function aplicarDescuento() {
    const codigoInput = document.getElementById("codigo-input");
    const codigo = codigoInput.value.trim().toUpperCase();
    
    if (codigo === "TINEO10") {
        if (!localStorage.getItem('descuentoAplicado')) {
            localStorage.setItem('descuentoAplicado', 'true');
            mostrarCarrito();
            alert("¡Descuento aplicado con éxito!");
        } else {
            alert("Ya tienes un descuento aplicado");
        }
    } else {
        alert("Código de descuento inválido");
    }
    codigoInput.value = "";
}

// Mostrar/ocultar campos de tarjeta
metodoPagoSelect.addEventListener('change', function() {
    datosTarjeta.style.display = this.value === 'tarjeta' ? 'block' : 'none';
});

// Manejar envío del formulario
formularioPago.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    const metodoPago = metodoPagoSelect.value;
    if (metodoPago === 'tarjeta') {
        const numeroTarjeta = document.getElementById('numero-tarjeta').value;
        const fechaVencimiento = document.getElementById('fecha-vencimiento').value;
        const cvv = document.getElementById('cvv').value;

        if (!numeroTarjeta || !fechaVencimiento || !cvv) {
            alert("Por favor completa todos los datos de la tarjeta");
            return;
        }
    }

    // Aquí iría la lógica de procesamiento del pago
    alert("¡Gracias por tu compra! Te enviaremos un correo con los detalles de tu pedido.");
    
    // Limpiar carrito y redirigir
    localStorage.removeItem('carrito');
    localStorage.removeItem('descuentoAplicado');
    window.location.href = 'index.html';
});

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    mostrarCarrito();
}); 