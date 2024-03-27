//Variables, constantes y arrays
const btnCarrito = document.querySelector(".carrito");
const mostrarCarrito = document.querySelector(".carritoProductos");
const cruzCarrito = document.querySelector(".sacarCarrito");
const listaProductos = document.querySelector(".productosSection");
const listaCarrito = document.querySelector("#productosSeleccionados tbody");
const carritoVacio = document.querySelector(".carritoVacio");
const listaProductosCarrito = document.querySelector(".tablaProductos");
const numero = document.querySelector(".cantidadProductosCarrito");
const btnVacioCarrito = document.querySelector(".vaciarCarritoBtn");
const btnCompraCarrito = document.querySelector(".finalizarCarritoBtn");
const noResultados = document.querySelector(".productosInexistentes");
const btnLimpiarStock = document.querySelector(".limpiarFiltros");
const productosStockProducto = document.querySelector("#productosLista");
const productosPrecio = document.querySelector("#carritoPrecios");
const costoTotal = document.querySelector("#precioTotal");
const totalCosto = document.querySelector(".totalCosto");
const filtrosBusqueda = document.querySelector("#nombreFiltros");
const btnFormulario = document.querySelector('.enviarForm');
let carritoProductos = [];

//Menú hamburguesa navbar
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const secciones = document.querySelector('.secciones');

    menuToggle.addEventListener('click', () => {
        secciones.classList.toggle('show');
    });
});

//guardar productos del carrito function
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(carritoProductos));
}

//Desplegar y Sacar Carrito function
btnCarrito.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarCarrito.classList.toggle("hiddenCart")
})

cruzCarrito.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarCarrito.classList.toggle("hiddenCart")
})

//Sacar/poner el texto de carrito vacio cuando se va llenando y viceversa function
function revisarMensajeVacio() {
    carritoVacio.classList.toggle("disabled", carritoProductos && carritoProductos.length > 0);
    listaProductosCarrito.classList.toggle("disabled", !(carritoProductos && carritoProductos.length > 0));
    btnVacioCarrito.classList.toggle("disabled", !(carritoProductos && carritoProductos.length > 0));
    btnCompraCarrito.classList.toggle("disabled", !(carritoProductos && carritoProductos.length > 0));
    costoTotal.classList.toggle("disabled", !(carritoProductos && carritoProductos.length > 0));
    totalCosto.classList.toggle("disabled", !(carritoProductos && carritoProductos.length > 0));
}
revisarMensajeVacio();

//Vaciar carrito function 
function vaciarCarrito() {
    btnVacioCarrito.addEventListener("click", (e) => {
        Swal.fire({
            title: "¿Quiere vaciar el carrito?",
            text: "Al vaciarlo perderá todos los productos que tiene en el carrito",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Volver",
            confirmButtonText: "Vaciar Carrito"
        }).then((result) => {
            if (result.isConfirmed) {
                e.preventDefault();
                carritoProductos = [];
                carritoHTML();
                actualizarNumero();
                revisarMensajeVacio();
            }
        })
    });
};
vaciarCarrito();

//Actualizar numerito cuando suma elementos al carrito function
function actualizarNumero() {
    let actualizaNumerito = carritoProductos.reduce((acum, productos) => acum + productos.cantidad, 0)
    numero.innerText = actualizaNumerito
};


//cargar eventListeners para las funciones que lo requieran
cargarEventListeners()
function cargarEventListeners() {

    listaProductos.addEventListener("click", agregarProducto);

    mostrarCarrito.addEventListener("click", sumarProducto);
    mostrarCarrito.addEventListener("click", eliminarProducto);

    document.addEventListener("DOMContentLoaded", () => {
        carritoProductos = JSON.parse(localStorage.getItem("productos")) || [];
        carritoHTML();
        actualizarNumero();
        calcularCostoTotal();
        revisarMensajeVacio();
    });
};

//Agregar productos al carrito function
function agregarProducto(e) {

    if (e.target.classList.contains("agregarCarrito")) {
        let productoSeleccionado = e.target.parentElement.parentElement
        leerDatosProductos(productoSeleccionado)
    }
    envioAgregado = false;
    actualizarNumero();
    revisarMensajeVacio();
};


function leerDatosProductos(productos) {

    const infoProducto = {
        imagen: productos.querySelector(".mangaImage").src,
        producto: productos.querySelector("h3").textContent,
        precio: productos.querySelector(".productosPrecio").textContent,
        id: productos.querySelector(".agregarCarrito").getAttribute("data-id"),
        cantidad: 1,
        stock: Number(productos.querySelector(".cuotasSinInteres").textContent),
    };

    const productoExistente = carritoProductos.find(producto => producto.id === infoProducto.id);

    if (productoExistente) {
        if (productoExistente.stock > 0) {
            productoExistente.cantidad++;
            productoExistente.stock--;
            Swal.fire({
                title: "Agregado al carrito!",
                text: "¿Qué desea hacer?",
                icon: "success",
                showCancelButton: true,
                cancelButtonText: "Seguir Comprando",
                confirmButtonText: "Ir al carrito"
            }).then((result) => {
                if (result.isConfirmed) {
                    mostrarCarrito.classList.remove("hiddenCart")
                }
            });
        } else {
            console.log('No hay suficiente stock para agregar más productos.');
            Swal.fire({
                title: "Agotaste el stock para este producto!",
                icon: "error",
                text: "No se puede agregar al carrito, no hay stock disponible.",
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: "Seguir Comprando"
            });
        }
    } else {
        if (infoProducto.stock > 0) {
            Swal.fire({
                title: "Agregado al carrito!",
                text: "¿Qué desea hacer?",
                icon: "success",
                showCancelButton: true,
                cancelButtonText: "Seguir Comprando",
                confirmButtonText: "Ir al carrito"
            }).then((result) => {
                if (result.isConfirmed) {
                    mostrarCarrito.classList.remove("hiddenCart")
                }
            });
            carritoProductos.push({
                ...infoProducto,
                cantidad: 1,
                stock: infoProducto.stock - 1
            });
        }
    };

    console.log(carritoProductos);
    carritoHTML();
};

function carritoHTML() {

    limpiarCarrito();

    carritoProductos.forEach(productos => {

        const fila = document.createElement('tr');
        fila.classList = "tablaCarrito"
        fila.innerHTML = `
            <td>
                <img class="imagenProductos" id="pImagen"
                src="${productos.imagen}" width="100">
            </td>
            <td>
                <p class="imagenProductos" id="pProductoCarrito"> ${productos.producto} </p>
            </td>
            <td>
                <p class="imagenProductos" id="carritoPrecios">$${productos.precio}
                </p>
            </td>
            <td class="cantidadProductos">
                <div class="btnSumarContainer">
                <p class="imagenProductos"><a href="#" class="btnSumar" data-id="${productos.id}">+</a></p>
                <p class="imagenProductos" id="pCantidad"> ${productos.cantidad} </p>
                </div>
            </td>
            <td>
                <p class="imagenProductos">
                <a href="#" class="sacarProductos" data-id="${productos.id}">X</a>
                </p>
            </td>
        `;

        listaCarrito.appendChild(fila);

    });

    guardarProductos();
    calcularCostoTotal();
};

//Calcular costo total function
function calcularCostoTotal() {
    costoTotal.innerText = carritoProductos.reduce((acum, productos) => acum + (productos.precio * productos.cantidad), 0);
};

//Function reiniciar carrito
function limpiarCarrito() {
    listaCarrito.innerHTML = ""
}

//Eliminar del carrito
let btnEliminar = document.querySelector(".sacarProductos");

function actualizarBotonesEliminar() {
    btnEliminar = document.querySelector(".sacarProductos")

    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto())
    });
};

function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("sacarProductos")) {
        const productosId = e.target.getAttribute("data-id");
        const existe = carritoProductos.some(producto => (producto.id === productosId && producto.cantidad > 1));

        if (existe) {
            const productosEliminar = carritoProductos.map(productos => {
                if (productos.id == productosId) {
                    productos.cantidad--;
                    productos.stock++;
                }
                return productos;
            });
            carritoProductos = [...productosEliminar];

        } else {
            if (carritoProductos.length == 1) {
                Swal.fire({
                    title: "¿Quiere vaciar el carrito?",
                    text: "Al vaciarlo perderá todos los productos que tiene en el carrito",
                    icon: "question",
                    showCancelButton: true,
                    cancelButtonText: "Volver",
                    confirmButtonText: "Vaciar Carrito"
                }).then((result) => {
                    if (result.isConfirmed) {
                        e.preventDefault();
                        carritoProductos = [];
                        carritoHTML();
                        actualizarNumero();
                        revisarMensajeVacio();
                    }
                })
            } else {
                carritoProductos = carritoProductos.filter(productos => productos.id !== productosId);
            }
        }

        envioAgregado = false;
        carritoHTML();
        actualizarNumero();
        calcularCostoTotal();
        revisarMensajeVacio();
    };
};

//Sumar cantidad en carrito
let btnSumar = document.querySelector(".btnSumar");

function actualizarBotonesSumar() {
    btnSumar = document.querySelector(".btnSumar")

    btnSumar.forEach(boton => {
        boton.addEventListener("click", sumarProducto())
    });
};

function sumarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("btnSumar")) {
        const productosId = e.target.getAttribute("data-id");
        const productoEnCarrito = carritoProductos.find(producto => producto.id === productosId);

        if (productoEnCarrito) {
            if (productoEnCarrito.stock > 0) {
                productoEnCarrito.cantidad++;
                productoEnCarrito.stock--;
            } else {
                Toastify({
                    text: "Stock agotado",
                    duration: 1200,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "rgb(216, 3, 3)",
                    }
                }).showToast();
            }
        }

        envioAgregado = false;
        carritoHTML();
        actualizarNumero();
        calcularCostoTotal();
        revisarMensajeVacio();
    };
};

//Cambiar navbar al hacer scroll
function headerScrolled() {
    const paginaLogo = document.querySelector('.logoPagina');
    const logoContainer = document.querySelector('.logo');
    const containerNav = document.querySelector('.navContainer');
    const nameMarket = document.querySelector('.nombreLogoP');
    const nameAnime = document.querySelector('.nombreLogo');
    const carritoContainer = document.querySelector('.carritoProductos');
    const llevarArriba = document.querySelector('.flechaSubida');
    const secciones = document.querySelector('.secciones');
    const carritoIcon = document.querySelector('.carritoSpan');
    const carritoFixedMobile = document.querySelector('.carritoContainer');
    const wspIcono = document.querySelector('.iconoWhatsapp');

    containerNav.classList.remove('navFixed');
    paginaLogo.classList.remove('logoFixed');
    logoContainer.classList.remove('logoContainerFixed');
    nameMarket.classList.remove('marketFixed');
    nameAnime.classList.remove('animeFixed');
    carritoContainer.classList.remove('carritoFixed');
    llevarArriba.classList.add('disabled');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            if (window.innerWidth > 300) {
                paginaLogo.classList.add('logoFixed');
                containerNav.classList.add('navFixed');
                logoContainer.classList.add('logoContainerFixed');
                nameMarket.classList.add('marketFixed');
                nameAnime.classList.add('animeFixed');
                carritoContainer.classList.add('carritoFixed');
                carritoIcon.classList.add('carritoIconFixed');
                llevarArriba.classList.remove('disabled');
                secciones.classList.remove('show');
                carritoFixedMobile.classList.add("position");
                wspIcono.classList.remove('disabled');
            }
        }
        else {
            containerNav.classList.remove('navFixed');
            paginaLogo.classList.remove('logoFixed');
            logoContainer.classList.remove('logoContainerFixed');
            nameMarket.classList.remove('marketFixed');
            nameAnime.classList.remove('animeFixed');
            carritoContainer.classList.remove('carritoFixed');
            llevarArriba.classList.add('disabled');
            secciones.classList.remove('show');
            carritoIcon.classList.remove('carritoIconFixed');
            carritoFixedMobile.classList.remove("position");

            if (window.innerWidth < 593) {
                wspIcono.classList.add('disabled');
            }
        }
    });
}
headerScrolled();

//Resetar los valores del checkout function
function resetearValores() {
    const codigoPostalInput = document.getElementById('codigoPostal');
    codigoPostalInput.value = '';
    const precioEnvio = document.querySelector('.precioEnvio');
    precioEnvio.innerText = 0
    const envioGratis = document.querySelector('.envioGratuito');
    const precioEnvioSigno = document.querySelector('.costoActual');
    const errorEnvio = document.querySelector('.envioError');
    envioGratis.classList.add('disabled');
    precioEnvioSigno.classList.remove('disabled');
    errorEnvio.classList.add('disabled');
    let precioReiniciado = totalEnvio.innerText = costoTotal.innerText;
    precioReiniciado
    btnEnvio.addEventListener('click', () => {
        calcularEnvio();
    });
    envioAgregado = false;
}

//Finalizar compra function
btnCompraCarrito.addEventListener('click', () => {
    deshabilitarFinalizarCompra();
    const finalizarCompra = document.querySelector('.overlay');
    finalizarCompra.classList.toggle('disabled');
    const cruzCheckout = document.querySelector('.btnCheckout');
    cruzCheckout.addEventListener("click", () => {
        finalizarCompra.classList.add("disabled");
        resetearValores();
    });
});

//Function saltar de input al siguiente 
const numTarjetas = document.querySelectorAll('.numTarjeta');

numTarjetas.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const maxLength = parseInt(e.target.getAttribute('maxlength'));
        const currentLength = e.target.value.length;

        if (currentLength >= maxLength && index < numTarjetas.length - 1) {
            numTarjetas[index + 1].focus();
        }
    });
});

// Función para actualizar el total de envío
const totalEnvio = document.querySelector('#precioTotalEnvio');

const actualizarTotalEnvio = () => {
    totalEnvio.innerText = costoTotal.innerText;
};

const observer = new MutationObserver(actualizarTotalEnvio);
const config = { childList: true, subtree: true };
observer.observe(costoTotal, config);

//Calcular envío function
let envioAgregado = false;

function calcularEnvio() {
    const codigoPostalIngresado = document.getElementById('codigoPostal').value;
    const envioGratis = document.querySelector('.envioGratuito');
    const precioEnvioSigno = document.querySelector('.costoActual');
    const errorEnvio = document.querySelector('.envioError');

    if (codigoPostalIngresado >= 1000 && codigoPostalIngresado <= 2000 && costoTotal.innerText < 15000) {
        if (!envioAgregado) {
            const precioEnvio = document.querySelector('.precioEnvio');
            precioEnvio.innerText = 3000;
            errorEnvio.classList.add('disabled');
            envioGratis.classList.add('disabled');
            precioEnvioSigno.classList.remove('disabled');
            const totalFinal = Number(totalEnvio.innerText);
            const precioFinalEnvio = Number(precioEnvio.innerText);
            totalEnvio.innerText = totalFinal + precioFinalEnvio;
            envioAgregado = true;
        }
    } else if (codigoPostalIngresado >= 1000 && codigoPostalIngresado <= 2000 && costoTotal.innerText >= 15000) {
        if (!envioAgregado) {
            envioGratis.classList.remove('disabled');
            precioEnvioSigno.classList.add('disabled');
            errorEnvio.classList.add('disabled');
            const precioEnvio = document.querySelector('.precioEnvio');
            precioEnvio.innerText = 0;
            const totalFinal = Number(totalEnvio.innerText);
            const precioFinalEnvio = Number(precioEnvio.innerText);
            totalEnvio.innerText = totalFinal + precioFinalEnvio;
            envioAgregado = true;
        }
    } else {
        errorEnvio.classList.remove('disabled');
        precioEnvioSigno.classList.add('disabled');
        envioGratis.classList.add('disabled');
        deshabilitarFinalizarCompra();
    }
}

const btnEnvio = document.querySelector('.calcularEnvio');
btnEnvio.addEventListener('click', () => {
    calcularEnvio();
});

// Función para habilitar el botón de Finalizar Compra
function habilitarFinalizarCompra() {
    comprarProductos.classList.remove('desactivado');
}

// Función para deshabilitar el botón de Finalizar Compra
function deshabilitarFinalizarCompra() {
    comprarProductos.classList.add('desactivado');
}

const comprarProductos = document.querySelector('#btnCompraFinal');
comprarProductos.addEventListener("click", (e) => {
    e.preventDefault();
    if (comprarProductos.classList.contains('desactivado')) {
        Toastify({
            text: "Por favor, complete todos los datos para continuar",
            duration: 1200,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "rgb(216, 3, 3)"
            }
        }).showToast();
    } else {
        Swal.fire({
            title: "¿Quiere Finalizar la compra?",
            text: "Al aceptar, la compra pasará a finalizar",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Volver",
            confirmButtonText: "Finalizar Compra"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Compra finalizada",
                    text: "Muchas gracias por confiar en nosotros!!",
                    icon: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showCloseButton: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.clear();
                        location.reload();
                    }
                });
            };
        });
    };
});

// Elementos del formulario
const numeroTarjeta = document.querySelector('.numTarjeta');
const nombreTarjeta = document.querySelector('.nombreTarjeta');
const telefonoTarjeta = document.querySelector('.telTarjeta');
const emailTarjeta = document.querySelector('.emailTarjeta');
const codigoPostalIngresado = document.getElementById('codigoPostal').value;

// Función para comprobar si los campos están completos
function verificarCamposCompletos() {
    const camposCompletos = numeroTarjeta.value.trim() !== '' && nombreTarjeta.value.trim() !== '' && emailTarjeta.value.trim() !== '' && telefonoTarjeta.value.trim() !== '';

    if (camposCompletos && envioAgregado) {
        habilitarFinalizarCompra();
    } else {
        deshabilitarFinalizarCompra();
    }
}

// Añadir evento input a los campos del formulario
numeroTarjeta.addEventListener('input', verificarCamposCompletos);
nombreTarjeta.addEventListener('input', verificarCamposCompletos);
telefonoTarjeta.addEventListener('input', verificarCamposCompletos);
emailTarjeta.addEventListener('input', verificarCamposCompletos);

//Boton de sumbit formulario
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault();
    const contactoForm = document.querySelectorAll('.inputContacto');

    let isEmpty = false;

    contactoForm.forEach(input => {
        if (input.value.trim() === '') {
            isEmpty = true;
            return;
        }
    });

    if (isEmpty) {
        Toastify({
            text: "Por favor complete todos los campos para enviar el formulario",
            duration: 1200,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "rgb(216, 3, 3)",
            }
        }).showToast();
    } else {
        Swal.fire({
            title: "Enviado!",
            icon: "success",
            text: "Tu mensaje ha sido enviado, nos mantendremos en contacto.",
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: "Ok"
        });
    }
});
