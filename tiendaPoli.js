class Producto {
    constructor(nombreProducto, precio, stock) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.stock = stock;
    }
}

class Cliente { /**No estoy seguro si lo voy a usar */
    constructor(nombre, apellido, contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
    }
}

let total = 0;
let continuar = "s";

let tienda = [];
tienda.push(new Producto("remera", 200, 10));
tienda.push(new Producto("buzo", 500, 50));
tienda.push(new Producto("pantalon", 300, 5));
tienda.push(new Producto("campera", 800, 8));
tienda.push(new Producto("mochila", 1200, 3));
tienda.push(new Producto("calculadora", 2000, 15));
tienda.push(new Producto("lapices", 100, 100));
tienda.push(new Producto("goma", 200, 60));
tienda.push(new Producto("cuaderno", 400, 80));

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

do {
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
