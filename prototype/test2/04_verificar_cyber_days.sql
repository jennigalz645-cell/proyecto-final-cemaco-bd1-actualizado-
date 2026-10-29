SET LINESIZE 200;
SET PAGESIZE 100;

PROMPT === STOCK FINAL ===
SELECT i.id_sucursal, i.id_producto, p.nombre,
       i.stock_disponible, i.stock_reservado
FROM inventario i
JOIN productos p ON p.id_producto = i.id_producto
WHERE i.id_sucursal = 1 AND i.id_producto = 2;

PROMPT === ORDENES DE LA PRUEBA ===
SELECT id_orden, id_cliente, id_sucursal, canal_entrega,
       fecha_orden, estado, total_bruto
FROM ordenes
WHERE id_cliente IN (9001, 9002)
ORDER BY id_orden;

PROMPT === PAGOS DE LA PRUEBA ===
SELECT t.id_transaccion, t.id_orden, p.nombre AS pasarela,
       t.monto_bruto, t.comision_pasarela, t.monto_neto
FROM transacciones_pago t
JOIN pasarelas_pago p ON p.id_pasarela = t.id_pasarela
JOIN ordenes o ON o.id_orden = t.id_orden
WHERE o.id_cliente IN (9001, 9002)
ORDER BY t.id_transaccion;
