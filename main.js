
const contenedorProductos = document.getElementById('contenedorProductos');

const contenedorCarrito = document.getElementById('contenedorCarrito');

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

const carrito = [];

//Moldeador Prodductos
class Productos {
    constructor (pIdProducto, pNombreProducto, pMarcaProducto, pModeloProducto, pPrecio, pStockUnidades, pImagen) {
        this.id = pIdProducto
        this.nombre = pNombreProducto;
        this.marca = pMarcaProducto;
        this.modelo = pModeloProducto;
        this.precio = pPrecio;
        this.stock = pStockUnidades;
        this.imagen = pImagen;
    }
}

// Array y push de todos los productos
const arrayProductos = [];

arrayProductos.push (new Productos (1, "Procesador Ryzen 7 3700x", "Ryzen", "7 3700x", 40000, 10, "./images/ryzen_7_3700x.jpg"));
arrayProductos.push (new Productos (2, "Procesador Intel i7-10700F", "Intel", "i7-10700F", 40000, 8, "./images/intel_i7-10700f.jpg"));
arrayProductos.push (new Productos (3, "Procesador Ryzen 5 1600AF", "Ryzen", "5 1600AF", 20000, 8, "./images/ryzen_5_1600af.jpg"));
arrayProductos.push (new Productos (4, "Procesador Intel i5-9400", "Intel", "i5-9400", 30000, 6, "./images/intel_i5-9400.jpg"));
arrayProductos.push (new Productos (5, "Mother Gigabyte B450 Aorus", "Gigabyte", "B450", 15000, 4, "./images/gigabyte_b450_aorus.jpg"));
arrayProductos.push (new Productos (6, "Mother Asrock X570 Steel Legend", "Asrock", "X570", 20000, 2, "./images/asrock_x570_steel_legend.jpg"));
arrayProductos.push (new Productos (7, "Mother Asus Rog Strix B550-F", "Asus", "B550-F", 30000, 6, "./images/asus_rog_strix_b550-f.jpg"));
arrayProductos.push (new Productos (8, "Mother MSI A520M-A", "MSI", "A520M-A", 7000, 10, "./images/msi_a520m-a.jpg"));
arrayProductos.push (new Productos (9, "Placa de Video Zotac RTX 3060 Ti 8GB GDDR6", "Zotac", "3060 Ti", 160000, 7, "./images/zotac_rtx_3060ti.jpg"));
arrayProductos.push (new Productos (10, "Placa de Video Gigabyte RTX 3090 24GB GDDR6", "Gigabyte", "3090", 560000, 2, "./images/gigabyte_rtx_3090.jpg"));
arrayProductos.push (new Productos (11, "Placa de Video Asrock RX 570 8GB", "Asrock", "RX 570", 120000, 12, "./images/asrock_rx_570.jpg"));
arrayProductos.push (new Productos (12, "Placa de Video XFX RX 6600 XT 8GB GDDR6", "XFX", "6600 XT", 140000, 4, "./images/xfx_rx_6600xt.jpg")); 

// Ordenando el array mediante sort

arrayProductos.sort((a, b) => {

    if (a.precio < b.precio) {
        return -1;
    }
    if (a.precio > b.precio) {
        return 1;
    }

    return 0;
}
)

// Dom Productos

const mostrarProductos = (array) => {

    contenedorProductos.innerHTML = '';

    array.forEach( (producto) => {

        const div = document.createElement('div');
        div.className = "card text-center text-white bg-dark carta item";
        div.style = "width: 18rem";
        div.innerHTML = `
                    <img src=${producto.imagen} class="card-img-top itemImagen" alt="...">
                    <div class="card-body">
                    <h5 class="card-title itemNombre">${producto.nombre}</h5>
                    <p class="card-text itemPrecio">Precio: $${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-warning">Añadir al carrito</button>
                    </div>
        `

        contenedorProductos.appendChild(div)

    } )
}

mostrarProductos(arrayProductos)

const agregarAlCarrito = (itemId) => {

    const productoEnCarrito = carrito.find((producto) => producto.id === itemId)

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++
    } else {

        const producto = arrayProductos.find( (producto) => producto.id === itemId)
    
        carrito.push({
            imagen: producto.imagen,
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        })
    }
    
    actualizarCarrito()

}

// Render

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = '';

    carrito.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                <div class="gridImagen">
                    <img src=${producto.imagen} class="imagenProductoEnCarrito centrarProductoEnCarrito">
                </div>
                <div class="gridNombre">
                <p class="centrarProductoEnCarrito">${producto.nombre}</p>
                </div>
                <div class="gridPrecio">
                <p class="centrarProductoEnCarrito">Precio: $${producto.precio}</p>
                </div>
                <div class="gridCantidad">
                <p class="centrarProductoEnCarrito">Cantidad: ${producto.cantidad}</p>
                </div>
                <div class="gridBoton">
                <button onclick="eliminarProducto(${producto.id})" class="btn btn-danger boton-eliminar centrarProductoEnCarrito">Eliminar del Carrito <i class="fas fa-trash-alt"></i></button>
                </div>
        `

        contenedorCarrito.appendChild(div)
    })

    contadorCarrito.innerText = carrito.reduce((acc, producto) => acc += producto.cantidad, 0)
    precioTotal.innerText = carrito.reduce((acc, producto) => acc += producto.precio * producto.cantidad, 0)
}

const eliminarProducto = (itemId) => {
    const producto = carrito.find((producto) => producto.id === itemId)
    
    producto.cantidad--

    if (producto.cantidad === 0) {
        const index = carrito.indexOf(producto)
        carrito.splice(index, 1)
    }
   
    actualizarCarrito()
}


// Formulario

let formulario = document.getElementById('formulario');

formulario = addEventListener('submit', validarFormulario);

function validarFormulario (e) {

    e.preventDefault();

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El formulario ha sido enviado correctamente!',
        showConfirmButton: false,
        timer: 1500
    })

}

// Buscador

const buscador = document.getElementById('buscador')

const buscar = (search) => {
    return arrayProductos.filter((prod) => prod.nombre.toLowerCase().includes(search))
}


buscador.addEventListener('input', () => {
    const search = buscador.value.trim().toLowerCase()
    mostrarProductos( buscar(search) )  
})

// Filtro

const selectPrecios = document.getElementById('precios');

const filtrar = () => {
    
    let valorFiltroPrecios = selectPrecios.value
    
    let arrayFiltrado = []

    if (valorFiltroPrecios == 0) {
        arrayFiltrado = arrayProductos;
    } 
    else if (valorFiltroPrecios == 1) {
        arrayFiltrado = arrayProductos.filter( producto => producto.precio <= 30000)
    } 
    else if (valorFiltroPrecios == 2) {
        arrayFiltrado = arrayProductos.filter( producto => producto.precio >= 30000)
    }

    mostrarProductos(arrayFiltrado)

}

selectPrecios.addEventListener('change', ()=>{
    filtrar()
})

// Modal Bienvenida

const modalContenedor = $('.modalContenedor');

const botonCerrarModal = $('#modalCerrar');


$(document).ready( () => {
    setTimeout( () =>{
    modalContenedor.addClass('modal-active');
    }, 1000 )

    botonCerrarModal.click( () => {
        modalContenedor.remove('.modal-active');
    } )
})

// Preguntas Frecuentes

$('#pregunta1').click( () => {
    $('#pregunta1 hr').slideToggle(300)
    $('#pregunta1 p').slideToggle(300)
})

$('#pregunta2').click( () => {
    $('#pregunta2 hr').slideToggle(300)
    $('#pregunta2 p').slideToggle(300)
})

$('#pregunta3').click( () => {
    $('#pregunta3 hr').slideToggle(300)
    $('#pregunta3 p').slideToggle(300)
})

$('#pregunta4').click( () => {
    $('#pregunta4 hr').slideToggle(300)
    $('#pregunta4 p').slideToggle(300)
})

// jQuery Concat

$('.bg-text').css("color", "yellow")
    .fadeOut(1000)
    .delay(3000)
    .slideDown(1000);


// Api MP

const finalizarCompra = () => {

    console.log(carrito)
    const productosToMP = carrito.map( (producto) => {
        return {
            title: producto.nombre,
            description: '',
            picture_url: '',
            category_id: producto.id,
            quantity: producto.cantidad,
            currency_id: "ARS",
            unit_price: producto.precio
        }
    } )

    fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            Authorization: "Bearer TEST-1350696069941058-102519-9ddf8cded0383cb0b5a8b70be6518344-718422257"
        },
        body: JSON.stringify({
            items: productosToMP,
            back_urls: {
                success: window.location.href,
                failure: window.location.href
            }
        })
    })
    .then( res => res.json() )
    .then( data => {
        window.location.replace(data.init_point)
    } )
}