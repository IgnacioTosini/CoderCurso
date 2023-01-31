class Producto {
    constructor(nombreProducto, precio, stock, imagenProducto) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.stock = stock;
        this.imagenProducto = imagenProducto;
    }
}

class Cliente {
    constructor(nombre, apellido, contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
    }
}

function renderProducto(){
    containerMainTienda.innerHTML = "";

    for (const producto of tienda){
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
        const contador = document.createElement("p");
        contador.className = "contador";
        contador.innerHTML = 0;
        const botonMenos = document.createElement("button");
        botonMenos.className = "button";
        botonMenos.innerHTML = "-";

        div.append(pNombre);
        div.append(img);
        div.append(botonMas);
        div.append(contador);
        div.append(botonMenos);
        containerMainTienda.append(div);
    }
}

function agregarProducto(nombre, precio, stock, imagenProducto) {
    const producto = new Producto(nombre, precio, stock, imagenProducto);
    producto.nombreProducto = producto.nombreProducto.charAt().toUpperCase() + producto.nombreProducto.slice(1);
    tienda.push(producto);
    renderProducto();
}

let total = 0;
let continuar = "s";

const containerMainTienda = document.getElementById("containerMainTienda");
const tienda = [];

agregarProducto("remera", 200, 10, "../img/imgRemeraMangaLargaDanza.jpg");
agregarProducto("buzo", 500, 50, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("pantalon", 300, 5, "../img/remerasDelPoli.jpg");
agregarProducto("campera", 800, 8, "../img/visualesUno.jpeg");
agregarProducto("mochila", 1200, 3, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("calculadora", 2000, 15, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("lapices", 100, 100, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("goma", 200, 60, "../img/imgBuzoPolivalenteDeArte.jpg");
agregarProducto("cuaderno", 400, 80, "../img/imgBuzoPolivalenteDeArte.jpg");

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