let carrito = [];
let totalItems = 0;
let precioTotal = 0;
Total = 0;

$(document).ready(function() {
    //Llamada a renderizar
    renderizarProductos();
})


//ordenamos el array de productos por menor precio
productos.sort(function(a, b) { return a.precio - b.precio });



class productoCarrito {
    constructor(obj) {
        this.id = obj.id;
        this.foto = obj.foto;
        this.nombre = obj.nombre;
        this.precio = obj.precio;
        this.cantidad = 1;
    }
}

//Impresion del carrito dentro de la pushbar
$(".elcarrito").prepend(`            <div id="div1"">
<h4 class="tituloCarrito">Tu carrito:</h4>
<div class="table table-striped">
    <div id="tablabody">
        <!-- aqui tabla carrito -->
    </div>
</div>
</div>`)


//Impresion de carrito en pagina final
$(".carritoFinal").prepend(`<div <div id="tablabody"></div>
<div class="filasTotalFin">

    </div>
`)


//llamada a calcular el total
calculoTotal();
//llamada al carrito guardado en JSON
carritoViejo();


//Validacion de formulario final de compra
$("#formularioFinal").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            required: true,
            email: true
        }

    }
});


//guardar es el nombre del boton validar
$("#guardar").click(function() {
    if ($("#nombre").val() == false || $("#email").val() == false) {
        return;

    }
    let nombre = $("#nombre").val()
    let email = $("#email").val()
    $("#guardar").css("background-color", "green");
});

$("#limpiar").click(function() {
    $("#guardar").css("background-color", "rgb(239, 239, 239)");
});

//Validacion de formulario de contacto
$("#formularioContacto").validate({
    rules: {
        nombres: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        mail: {
            required: true,
            email: true
        },
        tipoSolicitud: {
            required: true,
        },
        mensaje: {
            required: true,
            minlength: 5,
            maxlength: 200
        }

    }
});

//Enviar es el nombre del boton submit en el formulario de contacto
$("#enviar").click(function() {
    if ($("#formularioContacto").val() == false) {
        return;

    }
    let nombres = $("#nombres").val()
    let mail = $("#mail").val()
    let tipoSolicitud = $("#tipo_solicitud").val()
    let mensaje = $("#mensaje").val()
    let newsletter = $("#avisos").is(":checked")

});


//Al presionar seguir comprando nos lleva otra vez a la pagina de productos
$(".btnSeguir").click(() => {
    location.href = '../pages/productos.html';

});

//Boton para finalizar la compra
$(".btnFin").click(() => {
    if ($("#nombre").val() == false || $("#email").val() == false) {
        Swal.fire({
            icon: 'error',
            title: 'Valide su nombre y su email',
            text: 'Escriba su nombre y su email, luego presione Validar',

        })
    } else {
        let timerInterval
        Swal.fire({
            title: 'Gracias por tu compra! En breve nos pondremos en contacto',
            html: 'Redirigiendo a la pagina de Inicio',
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {

            if (result.dismiss === Swal.DismissReason.timer) {
                location.href = '../pages/home.html';
                borrarCarrito();
                borrarCarrito();
                borrarCarrito();
            }

        })
    }
});


//PAGINA DE ALMENDRA Y COCO, un quienes somos, levanta de una API a personas simulando a los empleados

function obtenerDatos() {
    const URLGET = "https://reqres.in/api/users?page=2";
    $.get(URLGET).done(function(resultado, estado) {
        console.log("El estado que retorna la API es: " + estado);
        if (estado == "success") {
            let empleados = resultado.data;
            empleados.forEach(empleado => {
                $("#empleados").append(

                    `<li class="listaEmpleados text-center">
    <p> <img src=${empleado.avatar} class= "imgProd imgProd1"></p>
    <p class="textoEmpleados"><a> ${empleado.first_name} </a></p>
    <p class="textoEmail"> <a> ${empleado.email}</a> </p>
    </li>`);
            });
        }
    });
}

obtenerDatos();

//boton de ingreso al sitio
$("#botonIndex").click(() => {
    location.href = './pages/home.html';

});
