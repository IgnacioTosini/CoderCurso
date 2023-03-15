/* class Producto {
    constructor(nombreProducto, precio, stock, cantidad, imagenProducto) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.stock = stock;
        this.imagenProducto = imagenProducto;
        this.cantidad = cantidad;
    }
} */

/* class Cliente { Esta clase por el momento la comento ya que en un futuro me gustaria hacer un inicio de sesion pero al no poder guardar los datos no lo hago.
    constructor(nombre, apellido, contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
    }
}
 */

function obtenerCantidadGuardada(nombreProducto) {
    let cantidad = 0;
    const productoEnElCarrito = carrito.find((productoCarrito) => productoCarrito.nombreProducto === nombreProducto);
    if (productoEnElCarrito !== undefined) {
        cantidad = productoEnElCarrito.cantidad;
    }

    return cantidad;
}

function leerLs(recuperar) {
    let recuperado = 0;
    const recuperadoLs = localStorage.getItem(recuperar);

    if (recuperadoLs !== null) {
        recuperado = JSON.parse(recuperadoLs);
    }

    return recuperado;
}

function leerCarritoLs() {
    let carrito = [];
    const carritoLs = localStorage.getItem("carrito");

    if (carritoLs !== null) {
        carrito = JSON.parse(carritoLs);
    }

    return carrito;
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalFinal", JSON.stringify(totalFinal));
    localStorage.setItem("cantidadEnCarrito", JSON.stringify(cantidadEnCarrito.value));
}

function renderCarrito() {
    subContainerCarrito.innerHTML = "";
    containerTotalFinal.innerHTML = "";

    for (const producto of carrito) {
        const pNombre = document.createElement("p");
        pNombre.className = "p";
        pNombre.innerHTML = `${producto.nombreProducto}`;

        const cantidadProducto = document.createElement("p");
        cantidadProducto.className = "p";
        cantidadProducto.innerHTML = `${producto.cantidad}`;

        const totalProducto = document.createElement("p");
        totalProducto.className = "p";
        totalProducto.innerHTML = `$ ${producto.totalProducto}`;

        const botonEliminarProducto = document.createElement("button");
        botonEliminarProducto.className = "eliminarProducto";
        botonEliminarProducto.innerHTML = "-";
        botonEliminarProducto.onclick = () => {
            producto.cantidad = 0;
            cambioCarrito(producto, producto.cantidad);
            renderProducto(tienda);
        };

        subContainerCarrito.append(pNombre, cantidadProducto, totalProducto, botonEliminarProducto);
    }

    const total = document.createElement("p");
    total.className = "totalFinal";
    total.innerHTML = `$${totalFinal}`;
    containerTotalFinal.append(total);
}

function cambioCarrito(producto, cantidad) {
    const indice = carrito.findIndex((productoCarrito) => productoCarrito.nombreProducto === producto.nombreProducto);
    if (indice === -1 && cantidad != 0) {
        carrito.push({
            nombreProducto: producto.nombreProducto,
            cantidad: cantidad,
            totalProducto: producto.precio * cantidad * 1.21,
        });
        totalFinal = calcularTotalFinal(carrito);
    } else if (cantidad > 0) {
        carrito[indice].cantidad = cantidad;
        carrito[indice].totalProducto = producto.precio * cantidad * 1.21;
        totalFinal = calcularTotalFinal(carrito);
    } else if (cantidad == 0 && producto.nombreProducto) {
        carrito.splice(indice, 1);
        totalFinal = calcularTotalFinal(carrito);
    }

    cantidadEnCarrito.innerHTML = carrito.length;
    renderCarrito();
    guardarCarrito();
}

function calcularTotalFinal(carrito) {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].totalProducto;
    }
    return total;
}

function cargarProductosEnTienda() {
    fetch("/productos.json")
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            tienda = responseJson;
            renderProducto(tienda);
        });
}

function renderProducto(productosDeLaTienda) {
    containerMainTienda.innerHTML = "";

    for (const producto of productosDeLaTienda) {
        producto.nombreProducto = producto.nombreProducto.charAt().toUpperCase() + producto.nombreProducto.slice(1);
        const div = document.createElement("div");
        div.className = "containerProducto";

        const pNombre = document.createElement("p");
        pNombre.className = "nombreProducto";
        pNombre.innerHTML = `${producto.nombreProducto}`;

        const img = document.createElement("img");
        img.className = "img";
        img.src = producto.imagenProducto;

        const botonMas = document.createElement("button");
        botonMas.className = "button";
        botonMas.innerHTML = "+";
        botonMas.onclick = () => { if (contador.value < producto.stock) { contador.value++; cambioCarrito(producto, contador.value); } if (contador.value == producto.stock) { errorCantidad.className = "errorCantidadInvisible errorCantidadVisible"; } };

        const contador = document.createElement("input");
        contador.className = "contador";
        contador.maxLength = "3";
        contador.value = obtenerCantidadGuardada(producto.nombreProducto);
        contador.onchange = () => { if (contador.value >= producto.stock) { contador.value = producto.stock; errorCantidad.className = "errorCantidadInvisible errorCantidadVisible"; } else { errorCantidad.className = "errorCantidadInvisible"; } if (contador.value <= 0) contador.value = 0; }

        const errorCantidad = document.createElement("p");
        errorCantidad.className = "errorCantidadInvisible";
        errorCantidad.innerHTML = "Este es el maximo stock";

        const botonMenos = document.createElement("button");
        botonMenos.className = "button";
        botonMenos.innerHTML = "-";
        botonMenos.onclick = () => { if (contador.value > 0) { contador.value--; cambioCarrito(producto, contador.value); } if (contador.value < producto.stock) { errorCantidad.className = "errorCantidadInvisible"; } };

        const agregarProducto = document.createElement("button");
        agregarProducto.innerHTML = "Agregar Producto";
        agregarProducto.onclick = () => { cambioCarrito(producto, contador.value); };

        div.append(pNombre, img, botonMas, contador, errorCantidad, botonMenos, agregarProducto);
        containerMainTienda.append(div);
    }
}

function revisionStock() { //Esta funcion no tiene mucho sentido ya que al recargar la pagina vuelve todo a como estaba pero es por no poder modificar el .json.
    for (const produc of carrito) {
        for (const producto of tienda) {
            if (producto.nombreProducto == produc.nombreProducto) {
                producto.stock -= produc.cantidad;
            }
        }
    }
}

let tienda = [];
let carrito = leerCarritoLs();
cargarProductosEnTienda();

//Los Diferentes contenedores del Html a utilizar.
const containerMainTienda = document.getElementById("containerMainTienda");
const containerProdutosComprados = document.getElementById("containerProdutosComprados");
const subContainerCarrito = document.getElementById("subContainerCarrito");
const containerCarrito = document.getElementById("containerCarritoInvisible");
const containerTotalFinal = document.getElementById("containerTotalFinal");

let totalFinal = leerLs("totalFinal");
const buscarProducto = document.getElementById("buscadorProducto");
const errorBusqueda = document.getElementById('errorBusquedaInvisible');
let cantidadEnCarrito = document.getElementById("cantidadEnCarrito");

//Botones utilizados.
const botonAbrir = document.getElementById("botonAbrir");
const botonCerrar = document.getElementById("botonCerrar");
const botonBorrar = document.getElementById("botonBorrar");
const botonPagar = document.getElementById("botonPagar");

renderProducto(tienda);
renderCarrito(carrito);

buscarProducto.oninput = () => {
    const productoBuscado = buscarProducto.value;
    const productosFiltrados = tienda.filter((productos) => {
        return productos.nombreProducto.toLowerCase().includes(productoBuscado.toLowerCase());
    });
    if (productosFiltrados != "") {
        renderProducto(productosFiltrados);
        errorBusqueda.className = "errorBusquedaInvisible";
    } else {
        renderProducto(tienda);
        errorBusqueda.className = "errorBusquedaInvisible errorBusquedaVisible";
    }
};

botonAbrir.onclick = () => {
    containerCarrito.className = "containerCarritoInvisible containerCarritoVisible";
};

botonCerrar.onclick = () => {
    containerCarrito.className = "containerCarritoInvisible";
};

botonBorrar.onclick = () => {
    if (carrito.length != 0) {
        carrito.splice(0, carrito.length);
        totalFinal = 0;
        cantidadEnCarrito.innerHTML = 0;
        localStorage.clear();
        Toastify({
            text: "Se ha borrado el contenido del carrito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgba(255, 0, 0, 0.808), rgba(85, 0, 0, 0.808))",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        renderCarrito();
        renderProducto(tienda);
    }
};

botonPagar.onclick = () => {
    if (carrito.length != 0) {
        revisionStock();
        carrito.splice(0, carrito.length)
        totalFinal = 0;
        cantidadEnCarrito.innerHTML = 0;
        localStorage.clear();
        Toastify({
            text: "Pago realizado con exito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        renderCarrito();
        renderProducto(tienda);
    }
};