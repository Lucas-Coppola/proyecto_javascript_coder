let productosEnStock = [];
fetch("./productos.json")
.then(response => response.json())
.then(data => {
    productosEnStock = data;
    cargarProductos(productosEnStock);
});

//Productos que se van a ordenar en órden alfabético
let productosAZ = [
    {
        img: "./imgs/narutotomo26.jpeg",
        nombre: "Naruto Tomo 26",
        precio: 6000,
        cuotas: "6 cuotas sin interes de $1000",
        categoria: "mangas",
        id: 1,
        stock: 15
    },

    {
        img: "./imgs/jujutsukaisentomo8.jpeg",
        nombre: "Jujutsu Kaisen 8",
        precio: 6000,
        cuotas: "6 cuotas sin interes de $1000",
        categoria: "mangas",
        id: 2,
        stock: 4
    },

    {
        img: "./imgs/onepiecetomo59.jpeg",
        nombre: "One Piece Tomo 59",
        precio: 8900,
        cuotas: "6 cuotas sin interes de $1483.33",
        categoria: "mangas",
        id: 3,
        stock: 9
    },

    {
        img: "./imgs/tomodbs9.jpg",
        nombre: "Dragon Ball Super 9",
        precio: 8900,
        cuotas: "6 cuotas sin interes de $1483.33",
        categoria: "mangas",
        id: 4,
        stock: 50
    },

    {
        img: "./imgs/figurajujutsu.jpg",
        nombre: "Jujutsu Banpresto",
        precio: 75000,
        cuotas: "6 cuotas sin interes de $12500",
        categoria: "figuras",
        id: 5,
        stock: 22
    },

    {
        img: "./imgs/figuranaruto.jpg",
        nombre: "Naruto Banpresto",
        precio: 36000,
        cuotas: "6 cuotas sin interes de $6000",
        categoria: "figuras",
        id: 6,
        stock: 4
    },

    {
        img: "./imgs/figuraonepiece.jpg",
        nombre: "Ace Banpresto",
        precio: 75000,
        cuotas: "6 cuotas sin interes de $12500",
        categoria: "figuras",
        id: 7,
        stock: 2
    },

    {
        img: "./imgs/figuradragonball.jpg",
        nombre: "Vegetto Banpresto",
        precio: 36000,
        cuotas: "6 cuotas sin interes de $6000",
        categoria: "figuras",
        id: 8,
        stock: 7
    },

    {
        img: "./imgs/remeraevangelion.webp",
        nombre: "Evangelion Remera",
        precio: 8000,
        cuotas: "6 cuotas sin interes de $1333,33",
        categoria: "remeras",
        id: 9,
        stock: 13
    },

    {
        img: "./imgs/remerajujutsu.jpg",
        nombre: "Jujutsu Remera",
        precio: 8000,
        cuotas: "6 cuotas sin interes de $1333,33",
        categoria: "remeras",
        id: 10,
        stock: 60
    },

    {
        img: "./imgs/remeraonepiece.jpeg",
        nombre: "One Piece Remera",
        precio: 8000,
        cuotas: "6 cuotas sin interes de $1333,33",
        categoria: "remeras",
        id: 11,
        stock: 5
    },

    {
        img: "./imgs/remeraousama.webp",
        nombre: "Bojji Remera",
        precio: 8000,
        cuotas: "6 cuotas sin interes de $1333,33",
        categoria: "remeras",
        id: 12,
        stock: 44
    },

    {
        img: "./imgs/merchchainsaw.webp",
        nombre: "Pochita Chainsaw",
        precio: 8500,
        cuotas: "6 cuotas sin interes de $1416.66",
        categoria: "merch",
        id: 13,
        stock: 26
    },

    {
        img: "./imgs/merchfullmetal.png",
        nombre: "Reloj Fullmetal",
        precio: 5000,
        cuotas: "6 cuotas sin interes de $833,33",
        categoria: "merch",
        id: 14,
        stock: 3
    },

    {
        img: "./imgs/merchnaruto.webp",
        nombre: "Monedero Naruto",
        precio: 3000,
        cuotas: "6 cuotas sin interes de $500",
        categoria: "merch",
        id: 15,
        stock: 1
    },

    {
        img: "./imgs/merchnaruto2.jpg",
        nombre: "Bandana Naruto",
        precio: 6000,
        cuotas: "6 cuotas sin interes de $1000",
        categoria: "merch",
        id: 16,
        stock: 22
    }
];

//Cargar productos en el HTML function
let agregarBtn = document.querySelectorAll(".agregarCarrito");
const contenedorProductos = document.querySelector(".productosSection");

function cargarProductos(productosElegidos) {

    productosElegidos.forEach(productos => {
        const div = document.createElement("div");
        div.classList.add("mangas");
        div.setAttribute("id", "productosLista");
        div.innerHTML = `
            <img src="${productos.img}" alt="${productos.nombre}" class="mangaImage">
            <div class="productosDetalles">
                <h3 class="productosNombre">${productos.nombre}</h3>
                <p class="signoPesos"> $ <span class="productosPrecio">${productos.precio}</span></p>
                <p class="cuotasSinInteres disabled"> ${productos.stock}</p>
                <p class="cuotasSinInteres"> ${productos.cuotas}</p>
                <button class="agregarCarrito" data-id="${productos.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    });
};

cargarProductos(productosEnStock);

//Filtrar por categoria 
const selectCategorias = document.querySelector("#tiposProductosFiltros");

selectCategorias.addEventListener("click", (e) => {
    if (e.currentTarget.value != "todos") {
        contenedorProductos.innerHTML = "";
        const productosBtn = productosEnStock.filter(producto => producto.categoria === e.currentTarget.value);
        cargarProductos(productosBtn);
    } else {
        contenedorProductos.innerHTML = "";
        cargarProductos(productosEnStock);
    }

    limpiarFiltro();
});

//Limpiar filtros function
function limpiarFiltro() {
    btnLimpiarStock.addEventListener("click", () => {
        contenedorProductos.innerHTML = "";
        cargarProductos(productosEnStock);
    });
}

//Filtrar por nombre function
function filtrarNombre() {
    document.addEventListener("keyup", (e) => {
        if (e.target.matches("#nombreFiltros")) {
            const noResultados = document.querySelector('.productosInexistentes');
            if (!noResultados) {
                const noResultados = document.createElement("p");
                noResultados.classList.add("productosInexistentes");
                const sectionProductos = document.querySelector('.productosSection');
                sectionProductos.appendChild(noResultados);
            }

            const productosMangas = document.querySelectorAll(".mangas");
            let algunProducto = false;

            productosMangas.forEach(producto => {
                if (producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                    producto.classList.remove("disabled");
                    algunProducto = true;
                } else {
                    producto.classList.add("disabled");
                }
            });

            if (!algunProducto) {
                noResultados.innerText = "No existen resultados para tu búsqueda";
            } else {
                noResultados.innerText = "";
            }

            limpiarFiltro();
        }

        if (e.key === "Escape") {
            e.target.value = "";
        }
    });
}
filtrarNombre();

//Filtrar por orden alfabetico y precio
const ordenarAlfabeticamente = (array, getter, orden = "asc") => {
    array.sort((a, b) => {
        const primero = getter(a);
        const segundo = getter(b);

        const comparar = primero.localeCompare(segundo);
        return orden === "asc" ? comparar : -comparar;
    });
    return array
};

const ordenarAlfabeticamenteZA = (array, getter, orden = "asc") => {
    array.sort((a, b) => {
        const primero = getter(a);
        const segundo = getter(b);

        const comparar = segundo.localeCompare(primero);
        return orden === "asc" ? comparar : -comparar;
    });
    return array
};

const selectAlfabetico = document.querySelector("#ordenarProductos");

selectAlfabetico.addEventListener("click", (e) => {

    if (e.currentTarget.value === "option") {
        contenedorProductos.innerHTML = "";
        cargarProductos(productosEnStock);
    } else if (e.currentTarget.value === "nombre-AZ") {
        contenedorProductos.innerHTML = "";
        const productosAlfabeticos = ordenarAlfabeticamente(productosAZ, producto => producto.nombre);
        cargarProductos(productosAlfabeticos);
    } else if (e.currentTarget.value === "nombre-ZA") {
        contenedorProductos.innerHTML = "";
        const productosAlfabeticos = ordenarAlfabeticamenteZA(productosAZ, producto => producto.nombre);
        cargarProductos(productosAlfabeticos);
    } else if (e.currentTarget.value === "precio-ascendente") {
        contenedorProductos.innerHTML = "";
        const precioMenoraMayor = productosAZ.sort((a, b) => a.precio - b.precio);
        cargarProductos(precioMenoraMayor);
    } else if (e.currentTarget.value === "precio-descendente") {
        contenedorProductos.innerHTML = "";
        const productosMayoraMenor = productosAZ.sort((a, b) => b.precio - a.precio);
        console.log(productosMayoraMenor)
        cargarProductos(productosMayoraMenor);
    }

    limpiarFiltro();
});

//Filtrar por precio min y max seleccionado
function mostrarProductos() {
    const productosSection = document.querySelector('.productosSection');

    productosSection.innerHTML = '';

    cargarProductos(productosEnStock);
}

mostrarProductos();

function filtrarProductos() {
    const precioMinimo = parseFloat(document.getElementById('precioMinimo').value) || 0;
    const precioMaximo = parseFloat(document.getElementById('precioMaximo').value) || Number.MAX_VALUE;

    const productosFiltrados = productosEnStock.filter(producto => producto.precio >= precioMinimo && producto.precio <= precioMaximo);

    return productosFiltrados;
}


function actualizarProductos() {
    const productosFiltrados = filtrarProductos();
    const productosSection = document.querySelector('.productosSection');

    productosSection.innerHTML = '';

    if (productosFiltrados.length === 0) {
        const mensajeNoResultados = document.createElement('p');
        mensajeNoResultados.classList.add('productosInexistentes')
        mensajeNoResultados.textContent = 'No existen resultados para tu búsqueda';
        productosSection.appendChild(mensajeNoResultados);
    } else {
        cargarProductos(productosFiltrados);
    }

    limpiarFiltro();
}

document.getElementById('precioMinimo').addEventListener('input', actualizarProductos);
document.getElementById('precioMaximo').addEventListener('input', actualizarProductos);

mostrarProductos();
