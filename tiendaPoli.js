class Producto {
    constructor(nombreProducto, precio, stock, cantidad, imagenProducto) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.stock = stock;
        this.imagenProducto = imagenProducto;
        this.cantidad = cantidad;
    }
}

class Cliente {
    constructor(nombre, apellido, contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
    }
}

function renderProducto(productosDeLaTienda){
    containerMainTienda.innerHTML = "";

    for (const producto of productosDeLaTienda){
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
        botonMas.onclick = () => {if(contador.value < producto.stock) contador.value++;};
        const contador = document.createElement("input");
        contador.className = "contador";
        contador.value = 0;
        contador.onchange = () => {if(contador.value > producto.stock) contador.value = producto.stock};
        const botonMenos = document.createElement("button");
        botonMenos.className = "button";
        botonMenos.innerHTML = "-";
        botonMenos.onclick = () => {if(contador.value > 0) contador.value--;};
        const agregarProducto = document.createElement("button");
        agregarProducto.innerHTML = "Agregar Producto";
        agregarProducto.onclick = () => {alert(contador.value)};
        div.append(pNombre);
        div.append(img);
        div.append(botonMas);
        div.append(contador);
        div.append(botonMenos);
        div.append(agregarProducto);
        containerMainTienda.append(div);
    }
}

function agregarProducto(nombre, precio, stock, cantidad, imagenProducto) {
    const producto = new Producto(nombre, precio, stock, cantidad, imagenProducto);
    producto.nombreProducto = producto.nombreProducto.charAt().toUpperCase() + producto.nombreProducto.slice(1);
    tienda.push(producto);
    renderProducto(tienda);
}

let total = 0;
let continuar = "s";

const containerMainTienda = document.getElementById("containerMainTienda");
const tienda = [];

const buscarProducto = document.getElementById("buscadorProducto");
agregarProducto("remera", 200, 10, 0, "../img/imgRemeraMangaLargaDanza.jpg");
agregarProducto("buzo", 500, 5, 0, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("pantalon", 300, 5, 0, "../img/remerasDelPoli.jpg");
agregarProducto("campera", 800, 8, 0, "../img/visualesUno.jpeg");
agregarProducto("mochila", 1200, 3, 0, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("calculadora", 2000, 15, 0, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("lapices", 100, 100, 0, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("goma", 200, 60, 0, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("cuaderno", 400, 80, 0, "../img/imgBuzoPolivalenteDeArte.jpg");

buscarProducto.oninput = () => {
    const productoBuscado = buscarProducto.value;

    const productosFiltrados = tienda.filter((productos) => {
        return productos.nombreProducto.toLowerCase().includes(productoBuscado.toLowerCase());
    })
    renderProducto(productosFiltrados);
};
const calcularTotal = (cantidad, precio) => {
    let iva = 0.21;
    let total = (cantidad * precio) * iva;
    return (cantidad * precio) + total;
}

const calcularCantidad = (nombre, precio, stock) => {
    let cantidad = 0;
    do{
    cantidad = parseInt(prompt(`El precio de el/la ${nombre} es: ${precio} ¿Cuantas/tos quiere comprar?`));
    if(cantidad > stock){
        console.log(`Lo lamento, el stock es de: ${stock}, eliga una menor cantidad.`);
    }
    if(stock == 0){
        console.log(`Ya no hay stock, lo enviaremos al menu`);
        return 0;
    }
    }while(cantidad > stock);
    return cantidad;
}

/* do {
    console.log(`Los produtos son:`);
    for (const productos of tienda) {
        console.log(`${productos.nombreProducto}, el stock es de: ${productos.stock}.`);
    }
    let elegido = prompt(`¿Que desea comprar?`);
    const encontrado = tienda.find((producto) => producto.nombreProducto === elegido)
    if(encontrado != undefined){
        let cantidad = calcularCantidad(encontrado.nombreProducto, encontrado.precio, encontrado.stock);
        encontrado.stock -= cantidad;
        total += calcularTotal(cantidad, encontrado.precio);
        alert("Total por ahora es: " + total);
    }else if(encontrado == undefined){
        console.log("Lo lamento, no tenemos ese articulo");
    }

    continuar = prompt("Escriba 's' si desea continuar comprando");
} while (continuar == "s" || continuar == "S");
alert("Adios, espero que le haya gustado el servicio, vuelva pronto");
 */