
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { obtenerConexion } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/estado', async (req, res) => {
    let conexion;

    try {
        conexion = await obtenerConexion();

        const resultado = await conexion.execute(
            "SELECT SYS_CONTEXT('USERENV', 'SERVICE_NAME') FROM DUAL"
        );

        res.json({
            conectado: true,
            servicio: resultado.rows[0][0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ conectado: false });
    } finally {
        if (conexion) await conexion.close();
    }
});

app.get('/api/productos', async (req, res) => {
    let conexion;

    try {
        conexion = await obtenerConexion();

        const resultado = await conexion.execute(`
            SELECT
                p.ID_PRODUCTO,
                p.SKU,
                p.NOMBRE,
                p.DEPARTAMENTO,
                p.PRECIO,
                i.ID_SUCURSAL,
                i.STOCK_DISPONIBLE,
                i.STOCK_RESERVADO
            FROM PRODUCTOS p
            LEFT JOIN INVENTARIO i
                ON p.ID_PRODUCTO = i.ID_PRODUCTO
            ORDER BY p.ID_PRODUCTO, i.ID_SUCURSAL
        `);

        res.json(resultado.rows.map(fila => ({
            idProducto: fila[0],
            sku: fila[1],
            nombre: fila[2],
            departamento: fila[3],
            precio: fila[4],
            idSucursal: fila[5],
            stockDisponible: fila[6],
            stockReservado: fila[7]
        })));
    } catch (error) {
        console.error('Error consultando productos:', error.message);
        res.status(500).json({
            error: 'No se pudieron consultar los productos'
        });
    } finally {
        if (conexion) await conexion.close();
    }
});

app.post('/api/checkout', async (req, res) => {
    let conexion;
    let transaccionIniciada = false;

    try {
        const {
            idCliente,
            idSucursal,
            idPasarela,
            canal,
            items
        } = req.body || {};

        const cliente = Number(idCliente);
        const sucursal = Number(idSucursal);
        const pasarela = Number(idPasarela);

        if (
            idCliente === undefined ||
            idCliente === null ||
            idCliente === '' ||
            !Number.isInteger(cliente) ||
            cliente <= 0 ||
            idSucursal === undefined ||
            idSucursal === null ||
            idSucursal === '' ||
            !Number.isInteger(sucursal) ||
            ![1, 2, 3].includes(sucursal) ||
            idPasarela === undefined ||
            idPasarela === null ||
            idPasarela === '' ||
            !Number.isInteger(pasarela) ||
            ![1, 2, 3, 4].includes(pasarela) ||
            typeof canal !== 'string' ||
            !canal.trim() ||
            !Array.isArray(items) ||
            items.length === 0 ||
            items.length > 50
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Revisa los datos del checkout y los productos del carrito.'
            });
        }

        const productosCompra = [];
        const idsProductos = new Set();

        for (const item of items) {
            if (
                !item ||
                item.idProducto === undefined ||
                item.idProducto === null ||
                item.idProducto === '' ||
                item.cantidad === undefined ||
                item.cantidad === null ||
                item.cantidad === ''
            ) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Cada producto debe tener un ID y una cantidad válida.'
                });
            }

            const idProducto = Number(item.idProducto);
            const cantidad = Number(item.cantidad);

            if (
                !Number.isInteger(idProducto) ||
                idProducto <= 0 ||
                !Number.isInteger(cantidad) ||
                cantidad <= 0
            ) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Hay productos con cantidades o identificadores inválidos.'
                });
            }

            if (idsProductos.has(idProducto)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El carrito contiene productos duplicados.'
                });
            }

            idsProductos.add(idProducto);
            productosCompra.push({ idProducto, cantidad });
        }

        conexion = await obtenerConexion();
        transaccionIniciada = true;

        for (const item of productosCompra) {
            await conexion.execute(
                `BEGIN
                    SP_PROCESAR_CHECKOUT_ATOMICO(
                        p_id_cliente  => :idCliente,
                        p_id_sucursal => :idSucursal,
                        p_id_producto => :idProducto,
                        p_cantidad    => :cantidad,
                        p_canal       => :canal,
                        p_id_pasarela => :idPasarela
                    );
                END;`,
                {
                    idCliente: cliente,
                    idSucursal: sucursal,
                    idProducto: item.idProducto,
                    cantidad: item.cantidad,
                    canal: canal.trim(),
                    idPasarela: pasarela
                }
            );
        }

        await conexion.commit();
        transaccionIniciada = false;

        return res.json({
            ok: true,
            mensaje: 'Compra registrada correctamente.',
            productosProcesados: productosCompra.length
        });
    } catch (error) {
        console.error('Error en checkout:', error);

        if (conexion && transaccionIniciada) {
            try {
                await conexion.rollback();
                transaccionIniciada = false;
            } catch (errorRollback) {
                console.error('Error revirtiendo checkout:', errorRollback.message);
            }
        }

        const esValidacionOracle =
            Number.isInteger(error.errorNum) &&
            error.errorNum >= 20000 &&
            error.errorNum <= 20099;

        return res.status(esValidacionOracle ? 400 : 500).json({
            ok: false,
            mensaje: esValidacionOracle
                ? error.message
                : 'No se pudo registrar la compra. Se intentó revertir la transacción.'
        });
    } finally {
        if (conexion) {
            try {
                await conexion.close();
            } catch (error) {
                console.error('Error cerrando conexión:', error.message);
            }
        }
    }
});

app.use(express.static(path.join(__dirname, '..', 'prototype', 'app')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor CEMACO disponible en http://localhost:${PORT}`);
});



