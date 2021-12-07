//Renderiza los productos de la pagina productos, los tra del js de productos
function renderizarProductos() {
    for (const producto of productos) {
        $(".milista").append(`<li class="listaProd text-center">
        <p style="display: none"> ${producto.id}</p>
    <p> <img src=${producto.foto} class= "imgProd imgProd1"></p>
    <p class="textoProd"> ${producto.nombre} </p>
    <p class="textoProd"> $ ${producto.precio} </p>
    <button type="button" id=btn${producto.id} class="btn btn-outline-danger btn-sm ">Añadir al carrito</button>
    </li>`);
        //Eventos para los botones
        //Boton de Anñadir al Carrito
        $(`#btn${producto.id}`).on('click', function() {
            agregarAlCarrito(producto);
        });

        //boton de sumar dentro de cada item en el carrito

        $(`#A${producto.id}`).on('click', function() {
            agregarAlCarrito(producto);
        });

        //boton de restar dentro de cada item en el carrito
        $(`#B${producto.id}`).on('click', function() {
            restarAlCarrito(producto);
        });

        $(`.borrar`).on('click', function() {
            borrarCarrito(producto);
        });
    }
}

//Funcion para agregar un producto nuevo al carrito
function agregarAlCarrito(productoNuevo) {
    let encontrado = carrito.find(prod => prod.id == productoNuevo.id);
    if (encontrado == undefined) {
        let productoAAgregar = new productoCarrito(productoNuevo);
        carrito.push(productoAAgregar);
        localStorage.setItem("miCarrito", JSON.stringify(carrito));

        $("#tablabody").append(`
        <ul id="fila${productoAAgregar.id}" class="listaProductos">
        <li class="imgCarrito">
        <img src=${productoAAgregar.foto} class="imgCarrito">
        <p class="nombreCarrito">${productoAAgregar.nombre}</p>
        </li>
            <li class="cantidadCarrito" id='${productoAAgregar.id}'>(x ${productoAAgregar.cantidad})</li>
            <li class="precioCarrito">$${productoAAgregar.precio}</li>
            <li class="sumarCarrito"><button type="button" id='A${productoAAgregar.id}'  class="btn btn-success">+</button></li>
            <li class="restarCarrito"><button type="button" id='B${productoAAgregar.id}'  class="btn btn-danger">-</button></li>
            
            
        </ul>`);
        $(`#A${productoAAgregar.id}`).on('click', function() {
            agregarAlCarrito(productoAAgregar);
        });
        $(`#B${productoAAgregar.id}`).on('click', function() {
            restarAlCarrito(productoAAgregar);
        });

    } else {
        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);

        carrito[posicion].cantidad += 1;
        localStorage.setItem("miCarrito", JSON.stringify(carrito));
        $(`#${productoNuevo.id}`).html(`(x ${carrito[posicion].cantidad})`);
    }

    calculoTotal();
}

//Funcion de calculo total y de cantidad de items, nos imprime los resultados y borra los anteriores
function calculoTotal() {
    let total = 0
    let itemsTotales = 0;
    for (const productos of carrito) {
        total += (productos.precio * productos.cantidad);
        itemsTotales += productos.cantidad;
    }
    precioTotal = total;
    totalItems = itemsTotales;
    actualizarTotales();
    $("#div1").append(`<div id="div3" class='table table-striped'>
    <ul class="filasTotal">
    <li><h5>Total  $ ${precioTotal} </h5>
    <h6>Cantidad de items <a> ${totalItems}</a></h6></li>
    <li><button type="button" class="btn btn-primary comprar">Comprar</button>
    <button type="button" class="btn btn-secondary borrar">Vaciar</button></li>
    </ul>
    </div>`);
    $("#totalChango").append(`<div id="div4">${totalItems}</div>`);
    $(".filasTotalFin").append(`<div id="div5"><ul class="filasTotal">
    <li><h5>Total  $ ${precioTotal} </h5>
    <h6>Cantidad de items <a> ${totalItems}</a></h6></li>
    </ul></div>`);

    //Vaciar el carrito
    $(`.borrar`).on('click', function() {
        borrarCarrito();
        borrarCarrito();
        borrarCarrito();
    });
    //Nos lleva a la pagina final de compra
    $(`.comprar`).on('click', function() {
        location.href = '../pages/fin.html';
    });

}

//Esta funcion nos borra los divs creados 
function actualizarTotales() {
    //div3 corresponde a los totales que se ven dentro de la pushbar
    $("#div3").remove();
    //div4 corresponde al numerito que vemos chiquito en el changuito
    $("#div4").remove();
    //div5 corresponde a la impresion final en la pagina final de compra
    $("#div5").remove();
}

//para borrar el carrito ponemos las cantidades en 1 y ejecutamos la funcion restar
//como las cantidades quedan en cero las borra y luego ejecuta calculo total y deja todo en cero
function borrarCarrito() {

    for (const productoAborrar of carrito) {
        productoAborrar.cantidad = 1;
        restarAlCarrito(productoAborrar);
    }
    calculoTotal();
}

//Levanta los productos que se movieron del localstorage a la variable carrito cuando salgo de las paginas
function agregarElementosAlCarrito() {
    for (const productoCarrito of carrito) {
        $("#tablabody").append(`
        <ul id="fila${productoCarrito.id}" class="listaProductos">
        <li class="imgCarrito">
        <img src=${productoCarrito.foto} class="imgCarrito">
        <p class="nombreCarrito">${productoCarrito.nombre}</p>
        </li>
            <li class="cantidadCarrito" id='${productoCarrito.id}'>(x ${productoCarrito.cantidad})</li>
            <li class="precioCarrito">$${productoCarrito.precio}</li>
            <li class="sumarCarrito"><button type="button" id='A${productoCarrito.id}'  class="btn btn-success">+</button></li>
            <li class="restarCarrito"><button type="button" id='B${productoCarrito.id}'  class="btn btn-danger">-</button></li>
            
            
        </ul>`);
    }
}

//pasa lo del localstorage a carrito y los imprime de nuevo
function carritoViejo() {
    const carritoViejo = JSON.parse(localStorage.getItem("miCarrito"));
    if (carritoViejo) {
        carrito = carritoViejo;
        agregarElementosAlCarrito();
        calculoTotal();
    }
}

//funcion para restar un producto de la pushbar o eliminarlo si la cantidad llega a cero
function restarAlCarrito(productoNuevo) {
    let encontrado = carrito.find(prod => prod.id == productoNuevo.id);
    if (encontrado != undefined) {

        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);

        carrito[posicion].cantidad -= 1;
        $(`#${productoNuevo.id}`).html(`(x ${carrito[posicion].cantidad})`);
        if (carrito[posicion].cantidad == 0) {
            var indice = carrito.indexOf(carrito[posicion]);
            carrito.splice(indice, 1);
            actualizar(productoNuevo);
        }
        localStorage.setItem("miCarrito", JSON.stringify(carrito));


    }

    calculoTotal();
}

function actualizar(productoNuevo) {
    document.getElementById(`fila${productoNuevo.id}`).remove();
}