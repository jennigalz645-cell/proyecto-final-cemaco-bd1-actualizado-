const API_URL = "/api";

const sucursales = {
    1: "Plaza CEMACO Z.10",
    2: "CEMACO Peri-Roosevelt",
    3: "Central de Distribución Amatitlán"
};

const metodosPago = {
    1: "VisaNet",
    2: "Cuotas BAC",
    3: "Puntos Privilegio",
    4: "Efectivo contra entrega"
};

const imagenesProductos = {
    "FER-001": "https://cemacogt.vtexassets.com/arquivos/ids/311633-600-600?aspect=true&height=600&v=638439447269600000&width=600",
    "FER-002": "https://webergreece.gr/cdn/shop/files/weber_1501279_01.jpg?v=1760953630",
    "HOG-001": "https://cemacogtb2b.vtexassets.com/arquivos/ids/2736413-600-auto?aspect=true&height=auto&v=639097323890130000&width=600",
    "HOG-002": "https://cdn.leroymerlin.com.br/products/jogo_de_panelas_em_aco_inox__bsf_zwilling_hi_biarritz_5_pecas_1566862681_b143_600x600.jpg",
    "ELE-001": "https://mundiofertas.net/archivos/multimedia/fullsize/multimedia-Productos-imagen-64d13126d9674.png",
    "FER-003": "https://cemacogtb2b.vtexassets.com/arquivos/ids/159047-600-auto?aspect=true&height=auto&v=638493635220330000&width=600",
    "FER-004": "https://cemacogt.vtexassets.com/arquivos/ids/641659-600-600?aspect=true&height=600&v=638978347193000000&width=600",
    "FER-005": "https://cemacogt.vtexassets.com/arquivos/ids/582240-600-600?aspect=true&height=600&v=638439491108330000&width=600",
    "HOG-003": "https://cemacogt.vtexassets.com/arquivos/ids/324578-600-600?aspect=true&height=600&v=638439218495700000&width=600",
    "HOG-004": "https://cemacogtb2b.vtexassets.com/arquivos/ids/2575352-600-auto?aspect=true&height=auto&v=639101925682930000&width=600",
    "HOG-005": "https://cemacogtb2b.vtexassets.com/arquivos/ids/2561622-600-auto?aspect=true&height=auto&v=639102918070270000&width=600",
    "ELE-002": "https://cemacogtb2b.vtexassets.com/arquivos/ids/2543082-600-auto?aspect=true&height=auto&v=639100073468930000&width=600",
    "ELE-003": "https://cemacogtb2b.vtexassets.com/arquivos/ids/2552410-600-auto?aspect=true&height=auto&v=638718880348530000&width=600",
    "ELE-004": "https://cemacogtb2b.vtexassets.com/arquivos/ids/2541778-600-auto?aspect=true&height=auto&v=639039793667600000&width=600",
    "JAR-001": "https://cemacogt.vtexassets.com/arquivos/ids/708717-600-600?aspect=true&height=600&v=638955761555230000&width=600",
    "JAR-002": "https://cemacogtb2b.vtexassets.com/arquivos/ids/195331-600-auto?aspect=true&height=auto&v=638855244745300000&width=600",
    "JAR-003": "https://cemacogtb2b.vtexassets.com/arquivos/ids/404286-600-auto?aspect=true&height=auto&v=639102390978500000&width=600",
    "LIM-001": "https://cemacogtb2b.vtexassets.com/arquivos/ids/235772-600-auto?aspect=true&height=auto&v=638493647053870000&width=600",
    "LIM-002": "https://http2.mlstatic.com/D_NQ_NP_863192-MLA99599697364_122025-O.webp",
    "ORG-001": "https://cemacogtb2b.vtexassets.com/arquivos/ids/2543885-600-auto?aspect=true&height=auto&v=638799415128000000&width=600"
};

// Productos que se mostrarán agotados en cada sucursal.
const productosAgotadosPorSucursal = {
    1: ["FER-002"],
    2: ["JAR-003"],
    3: ["HOG-004"]
};

let productos = [];
let carrito = [];
let facturaActual = null;

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const selectorSucursal = document.getElementById("sucursal");
const formularioCheckout = document.getElementById("form-checkout");
const botonCompra = document.getElementById("boton-compra");
const mensaje = document.getElementById("mensaje");
const estadoProductos = document.getElementById("estado-productos");

function dinero(valor) {
    return new Intl.NumberFormat("es-GT", {
        style: "currency",
        currency: "GTQ",
        minimumFractionDigits: 2
    }).format(Number(valor) || 0);
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caracter]);
}

function obtenerCampo(objeto, posiblesNombres, valorPredeterminado = "") {
    for (const nombre of posiblesNombres) {
        if (objeto[nombre] !== undefined && objeto[nombre] !== null) {
            return objeto[nombre];
        }
    }

    return valorPredeterminado;
}

function normalizarProducto(producto) {
    return {
        id: Number(obtenerCampo(producto, [
            "idProducto", "ID_PRODUCTO", "id_producto", "id"
        ])),
        sku: String(obtenerCampo(producto, [
            "sku", "SKU"
        ], "")).trim().toUpperCase(),
        nombre: String(obtenerCampo(producto, [
            "nombre", "NOMBRE"
        ], "Producto")),
        departamento: String(obtenerCampo(producto, [
            "departamento", "DEPARTAMENTO"
        ], "")),
        precio: Number(obtenerCampo(producto, [
            "precio", "PRECIO"
        ], 0)),
        idSucursal: Number(obtenerCampo(producto, [
            "idSucursal", "ID_SUCURSAL", "id_sucursal"
        ], selectorSucursal.value)),
        stockDisponible: Number(obtenerCampo(producto, [
            "stockDisponible", "STOCK_DISPONIBLE", "stock_disponible"
        ], 0)),
        imagen: obtenerCampo(producto, [
            "imagen", "imagenUrl", "imagen_url", "urlImagen"
        ], "")
    };
}

function obtenerRutaImagen(producto) {
    const sku = String(producto?.sku || "").trim().toUpperCase();
    return producto?.imagen || imagenesProductos[sku] || "";
}

function mostrarMensaje(texto, tipo = "") {
    mensaje.textContent = texto;
    mensaje.className = "mensaje";

    if (tipo) {
        mensaje.classList.add(tipo);
    }
}

async function cargarProductos() {
    listaProductos.innerHTML = "";
    estadoProductos.textContent = "Cargando productos...";

    try {
        const respuesta = await fetch(
            `${API_URL}/productos?idSucursal=${encodeURIComponent(selectorSucursal.value)}`
        );

        if (!respuesta.ok) {
            throw new Error("No fue posible consultar los productos.");
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
            throw new Error("La API no devolvió una lista de productos válida.");
        }

        const idSucursalSeleccionada = Number(selectorSucursal.value);

        const productosDeSucursal = datos
            .map(normalizarProducto)
            .filter(producto =>
                Number.isFinite(producto.id) &&
                producto.idSucursal === idSucursalSeleccionada
            );

        const productosUnicos = new Map();

        productosDeSucursal.forEach(producto => {
            const clave = producto.sku || String(producto.id);

            if (!productosUnicos.has(clave)) {
                productosUnicos.set(clave, producto);
            }
        });

        const skusAgotados =
            productosAgotadosPorSucursal[idSucursalSeleccionada] || [];

        productos = Array.from(productosUnicos.values()).map(producto => {
            if (skusAgotados.includes(producto.sku)) {
                return {
                    ...producto,
                    stockDisponible: 0
                };
            }

            return producto;
        });

        estadoProductos.textContent = productos.length
            ? `${productos.length} productos encontrados en la sucursal seleccionada.`
            : "No se encontraron productos para esta sucursal.";

        renderizarProductos();
        actualizarCarritoPorInventario();
        renderizarCarrito();
    } catch (error) {
        estadoProductos.textContent = "";
        listaProductos.innerHTML = `
            <p class="mensaje error">
                No se pudieron cargar los productos. Verifica que el servidor esté
                ejecutándose en http://localhost:3000 y que la API esté disponible.
            </p>
        `;

        console.error("Error al cargar productos:", error);
    }
}

function renderizarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach(producto => {
        const cantidadEnCarrito = carrito
            .filter(item => item.id === producto.id)
            .reduce((suma, item) => suma + item.cantidad, 0);

        const stockRestante = Math.max(
            0,
            producto.stockDisponible - cantidadEnCarrito
        );

        const tarjeta = document.createElement("article");
        tarjeta.className = "producto-card";

        const imagen = obtenerRutaImagen(producto);
        const claseDepartamento = producto.departamento
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-");

        tarjeta.innerHTML = `
            <div class="producto-imagen">
                <p class="producto-departamento categoria-${claseDepartamento}">${escaparHTML(producto.departamento)}</p>
                <img
                    src="${escaparHTML(imagen)}"
                    alt="${escaparHTML(producto.nombre)}"
                    loading="lazy"
                >
                <span class="imagen-fallback" aria-hidden="true">Foto no disponible</span>
            </div>

            <div class="producto-info">
                <p class="producto-sku">${escaparHTML(producto.sku)}</p>
                <h3>${escaparHTML(producto.nombre)}</h3>

                <p class="producto-precio">${dinero(producto.precio)}</p>
                <p class="producto-stock ${stockRestante > 0 ? "stock-disponible" : "stock-agotado"}">
                    <svg class="icono-stock" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M10 1.5 18 5.7v8.6L10 18.5 2 14.3V5.7L10 1.5Z" fill="currentColor"></path>
                        <path d="m2.3 5.9 7.7 4 7.7-4M10 9.9v8" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"></path>
                    </svg>
                    ${stockRestante > 0
                        ? `Existencias disponibles: ${stockRestante}`
                        : "Sin existencias disponibles"}
                </p>
                <button
                    type="button"
                    class="boton boton-principal"
                    data-agregar="${producto.id}"
                    ${stockRestante <= 0 ? "disabled" : ""}
                >
                    <svg class="icono-boton-carrito" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6"></path>
                        <circle cx="10" cy="20" r="1.4"></circle>
                        <circle cx="18" cy="20" r="1.4"></circle>
                    </svg>
                    <span>Agregar al carrito</span>
                </button>
            </div>
        `;
        const imagenElemento = tarjeta.querySelector("img");
        const contenedorImagen = tarjeta.querySelector(".producto-imagen");

        imagenElemento.addEventListener("error", () => {
            contenedorImagen.classList.add("sin-imagen");
        });

        imagenElemento.addEventListener("load", () => {
            contenedorImagen.classList.remove("sin-imagen");
        });

        listaProductos.appendChild(tarjeta);
    });
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(item => item.id === Number(idProducto));

    if (!producto) {
        mostrarMensaje("No se encontró el producto seleccionado.", "error");
        return;
    }

    const itemExistente = carrito.find(item => item.id === producto.id);
    const cantidadActual = itemExistente ? itemExistente.cantidad : 0;

    if (cantidadActual >= producto.stockDisponible) {
        mostrarMensaje("No hay suficientes existencias para agregar otra unidad.", "error");
        return;
    }

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            sku: producto.sku,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            stockDisponible: producto.stockDisponible
        });
    }

    mostrarMensaje("");
    renderizarProductos();
    renderizarCarrito();
}

function cambiarCantidad(idProducto, cambio) {
    const item = carrito.find(item => item.id === Number(idProducto));

    if (!item) {
        return;
    }

    const productoActual = productos.find(producto => producto.id === item.id);
    const stockDisponible = productoActual
        ? productoActual.stockDisponible
        : item.stockDisponible;

    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad <= 0) {
        carrito = carrito.filter(producto => producto.id !== item.id);
    } else if (nuevaCantidad <= stockDisponible) {
        item.cantidad = nuevaCantidad;
    } else {
        mostrarMensaje("La cantidad supera las existencias disponibles.", "error");
    }

    renderizarProductos();
    renderizarCarrito();
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== Number(idProducto));
    renderizarProductos();
    renderizarCarrito();
}

function renderizarCarrito() {
    listaCarrito.innerHTML = "";

    const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
    const contadorCarrito = document.getElementById("contador-carrito");
    const enlaceCarrito = document.getElementById("enlace-carrito");

    if (contadorCarrito) {
        contadorCarrito.textContent = String(cantidadTotal);
        contadorCarrito.hidden = cantidadTotal === 0;
    }

    if (enlaceCarrito) {
        const etiquetaCantidad = cantidadTotal === 1 ? "producto" : "productos";
        enlaceCarrito.setAttribute("aria-label", `Mi compra, ${cantidadTotal} ${etiquetaCantidad}`);
    }

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        totalElemento.textContent = dinero(0);
        return;
    }

    carrito.forEach(item => {
        const fila = document.createElement("div");
        fila.className = "item-carrito";

        fila.innerHTML = `
            <div>
                <h4>${escaparHTML(item.nombre)}</h4>
                <p>${dinero(item.precio)} por unidad</p>
                <p>Subtotal: ${dinero(item.precio * item.cantidad)}</p>
            </div>

            <div class="item-carrito-acciones">
                <button
                    type="button"
                    class="boton-cantidad"
                    data-cantidad="-1"
                    data-id="${item.id}"
                    aria-label="Reducir cantidad"
                >−</button>

                <span>${item.cantidad}</span>

                <button
                    type="button"
                    class="boton-cantidad"
                    data-cantidad="1"
                    data-id="${item.id}"
                    aria-label="Aumentar cantidad"
                >+</button>

                <button
                    type="button"
                    class="boton-eliminar"
                    data-eliminar="${item.id}"
                    aria-label="Eliminar producto"
                >×</button>
            </div>
        `;

        listaCarrito.appendChild(fila);
    });

    const total = carrito.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
    );

    totalElemento.textContent = dinero(total);
}

function actualizarCarritoPorInventario() {
    carrito = carrito.map(item => {
        const productoActual = productos.find(producto => producto.id === item.id);

        if (!productoActual) {
            return item;
        }

        return {
            ...item,
            stockDisponible: productoActual.stockDisponible,
            precio: productoActual.precio,
            nombre: productoActual.nombre,
            sku: productoActual.sku
        };
    }).filter(item => item.stockDisponible > 0);

    carrito.forEach(item => {
        if (item.cantidad > item.stockDisponible) {
            item.cantidad = item.stockDisponible;
        }
    });
}

function mostrarFactura(datos) {
    facturaActual = datos;

    document.getElementById("factura-numero").textContent =
        datos.numero || "Comprobante de compra";

    document.getElementById("factura-fecha").textContent =
        datos.fecha.toLocaleString("es-GT");

    document.getElementById("factura-estado").textContent =
        datos.estado || "Compra registrada";

    document.getElementById("factura-cliente").textContent =
        datos.cliente;

    document.getElementById("factura-sucursal").textContent =
        datos.sucursal;

    document.getElementById("factura-pago").textContent =
        datos.metodoPago;

    document.getElementById("factura-total").textContent =
        dinero(datos.total);

    const tabla = document.getElementById("factura-productos");
    tabla.innerHTML = "";

    datos.items.forEach(item => {
        const fila = document.createElement("tr");

        const producto = document.createElement("td");
        producto.textContent = item.nombre;

        const cantidad = document.createElement("td");
        cantidad.textContent = String(item.cantidad);

        const precio = document.createElement("td");
        precio.textContent = dinero(item.precio);

        const subtotal = document.createElement("td");
        subtotal.textContent = dinero(item.precio * item.cantidad);

        fila.append(producto, cantidad, precio, subtotal);
        tabla.appendChild(fila);
    });

    const seccionFactura = document.getElementById("seccion-factura");
    seccionFactura.classList.remove("oculto");

    seccionFactura.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

async function finalizarCompra(evento) {
    evento.preventDefault();

    if (carrito.length === 0) {
        mostrarMensaje("Agrega al menos un producto antes de confirmar la compra.", "error");
        return;
    }

    const cliente = Number(document.getElementById("cliente").value);
    const idSucursal = Number(selectorSucursal.value);
    const idPasarela = Number(document.getElementById("pasarela").value);

    if (!Number.isInteger(cliente) || cliente <= 0) {
        mostrarMensaje("Ingresa un código de cliente válido.", "error");
        return;
    }

    if (!sucursales[idSucursal] || !metodosPago[idPasarela]) {
        mostrarMensaje("Selecciona una sucursal y un método de pago válidos.", "error");
        return;
    }

    const itemsFactura = carrito.map(item => ({
        id: item.id,
        sku: item.sku,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad
    }));

    const totalFactura = itemsFactura.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
    );

    const datosFactura = {
        cliente,
        sucursal: sucursales[idSucursal],
        metodoPago: metodosPago[idPasarela],
        fecha: new Date(),
        total: totalFactura,
        items: itemsFactura
    };

    const pedido = {
        idCliente: cliente,
        idSucursal,
        idPasarela,
        canal: "WEB",
        items: carrito.map(item => ({
            idProducto: item.id,
            cantidad: item.cantidad
        }))
    };

    botonCompra.disabled = true;
    botonCompra.textContent = "Procesando compra...";
    mostrarMensaje("Enviando pedido al servidor...");

    try {
        const respuesta = await fetch(`${API_URL}/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });

        const resultado = await respuesta.json().catch(() => ({}));

        if (!respuesta.ok || resultado.ok === false || resultado.exito === false) {
            throw new Error(
                resultado.mensaje ||
                resultado.error ||
                "El servidor no pudo completar la compra."
            );
        }

        const numeroOrden = obtenerCampo(resultado, [
            "idOrden",
            "id_orden",
            "numeroOrden",
            "numero_orden",
            "ordenId"
        ], "");

        datosFactura.numero = numeroOrden
            ? String(numeroOrden)
            : "Comprobante de compra";

        datosFactura.estado = obtenerCampo(resultado, [
            "estado",
            "mensaje"
        ], "Compra registrada");

        carrito = [];
        renderizarProductos();
        renderizarCarrito();

        mostrarMensaje(
            "Compra procesada. Puedes imprimir o guardar tu comprobante como PDF.",
            "exito"
        );

        mostrarFactura(datosFactura);
        await cargarProductos();
    } catch (error) {
        console.error("Error al finalizar compra:", error);

        mostrarMensaje(
            error.message || "No se pudo completar la compra. Verifica el servidor e inténtalo de nuevo.",
            "error"
        );
    } finally {
        botonCompra.disabled = false;
        botonCompra.textContent = "Confirmar compra";
    }
}

listaProductos.addEventListener("click", evento => {
    const boton = evento.target.closest("[data-agregar]");

    if (boton) {
        agregarAlCarrito(boton.dataset.agregar);
    }
});

listaCarrito.addEventListener("click", evento => {
    const botonCantidad = evento.target.closest("[data-cantidad]");
    const botonEliminar = evento.target.closest("[data-eliminar]");

    if (botonCantidad) {
        cambiarCantidad(
            botonCantidad.dataset.id,
            Number(botonCantidad.dataset.cantidad)
        );
    }

    if (botonEliminar) {
        eliminarDelCarrito(botonEliminar.dataset.eliminar);
    }
});

selectorSucursal.addEventListener("change", async () => {
    await cargarProductos();
});

formularioCheckout.addEventListener("submit", finalizarCompra);

document.getElementById("boton-imprimir").addEventListener("click", () => {
    if (facturaActual) {
        window.print();
    }
});

document.getElementById("boton-nueva-compra").addEventListener("click", () => {
    document.getElementById("seccion-factura").classList.add("oculto");
    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });
});

cargarProductos();

