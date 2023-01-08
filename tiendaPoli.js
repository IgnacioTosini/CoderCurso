const calcularSubtotal = (cantidad, precio) => {
    let iva = 0.21;
    let total = (cantidad * precio) * iva
    return (cantidad * precio) + total;
}

const calcularTotal = (subtotal, subtotal2) => {
    return subtotal + subtotal2;
}

let continuar = "s";
const precioRemera = 200;
const precioBuzo = 500;
const precioPantalon = 300;
const precioCampera = 800;
const precioMochila = 1200;
const precioCalculadora = 2000;
const precioLapices = 100;
const precioGoma = 200;
const precioCuaderno = 400;
let total = 0;
let subtotal = 0;
let subtotal2 = 0;

do{
    let cantidad = 0;
    let elegir = parseInt(prompt("Hola buenos dias, elija 1 para ir al apartado de uniforme o 2 para ir al de utiles escolares"));
    switch(elegir){
        case 1: {
            do{
                elegir = prompt("¿Que desea comprar? (remera, buzo, pantalon, campera)");
                switch(elegir){
                    case "remera": {
                        cantidad = parseInt(prompt("El precio de las remeras es: " + precioRemera + " ¿Cuantas quiere comprar? "));
                        subtotal = subtotal + calcularSubtotal(cantidad, precioRemera);
                        break;
                    }
                    case "buzo": {
                        cantidad = parseInt(prompt("El precio de los buzos es: " + precioBuzo + " ¿Cuantas quiere comprar? "));
                        subtotal = subtotal + calcularSubtotal(cantidad, precioBuzo);
                        break;
                    }
                    case "pantalon": {
                        cantidad = parseInt(prompt("El precio de los pantalones es: " + precioPantalon + " ¿Cuantas quiere comprar? "));
                        subtotal = subtotal + calcularSubtotal(cantidad, precioPantalon);
                        break;
                    }
                    case "campera": {
                        cantidad = parseInt(prompt("El precio de las camperas es: " + precioCampera + " ¿Cuantas quiere comprar? "));
                        subtotal = subtotal + calcularSubtotal(cantidad, precioCampera);
                        break;
                    }
                    default: {
                        console.log("Lo lamento, no tenemos ese articulo");
                    }
                }
                alert("Subtotal: " + subtotal);
                total = calcularTotal(subtotal, subtotal2);
                alert("Total por ahora es: " + total);
                continuar = prompt("Escriba 's' si desea continuar en este apartado");
            }while(continuar == "s" || continuar == "S");
            break;
        }
        case 2: {
            do{
            elegir = (prompt("¿Que desea comprar? (mochila, calculadora, lapices, goma de borrar, cuaderno)"));
            switch(elegir){
                case "mochila": {
                    cantidad = parseInt(prompt("El precio de las mochilas es: " + precioMochila + " ¿Cuantas quiere comprar? "));
                        subtotal2 = subtotal2 + calcularSubtotal(cantidad, precioMochila);
                    break;
                }
                case "calculadora": {
                    cantidad = parseInt(prompt("El precio de las calculadoras es: " + precioCalculadora + " ¿Cuantas quiere comprar? "));
                        subtotal2 = subtotal2 + calcularSubtotal(cantidad, precioCalculadora);
                    break;
                }
                case "lapices": {
                    cantidad = parseInt(prompt("El precio de los lapices es: " + precioLapices + " ¿Cuantas quiere comprar? "));
                        subtotal2 = subtotal2 + calcularSubtotal(cantidad, precioLapices);
                    break;
                }
                case "goma de borrar": {
                    cantidad = parseInt(prompt("El precio de las gomas es: " + precioGoma + " ¿Cuantas quiere comprar? "));
                        subtotal2 = subtotal2 + calcularSubtotal(cantidad, precioGoma);
                    break;
                }
                case "cuaderno": {
                    cantidad = parseInt(prompt("El precio de los cuadernos es: " + precioCuaderno + " ¿Cuantas quiere comprar? "));
                        subtotal2 = subtotal2 + calcularSubtotal(cantidad, precioCuaderno);
                    break;
                }
                default: {
                    console.log("Lo lamento, no tenemos ese articulo");
                }
            }
                alert("Subtotal de este apartado: " + subtotal2);
                total = calcularTotal(subtotal, subtotal2);
                alert("Total por ahora es: " + total);
            continuar = prompt("Escriba 's' si desea continuar en este apartado");
        }while(continuar == "s" || continuar == "S");
        break;
    }

    default:{
        alert("Ese apartado no existe, eliga uno existente");
            break;
        }
    }

    alert("Apartado Uniforme: " + subtotal + ", apartado utiles: " + subtotal2 + ", el total final es: " + total);
    continuar = prompt("Escriba 's' si desea continuar comprando");
}while(continuar == "s" || continuar == "S");
alert("Adios, espero que le haya gustado el servicio, vuelva pronto");
