
SELECT COUNT(*) AS total_productos
FROM productos;

SELECT COUNT(*) AS total_registros_inventario
FROM inventario;

SELECT COUNT(*) AS total_ordenes_prueba
FROM ordenes
WHERE id_cliente BETWEEN 10001 AND 10200;

SELECT COUNT(*) AS total_pagos_prueba
FROM transacciones_pago t
JOIN ordenes o ON o.id_orden = t.id_orden
WHERE o.id_cliente BETWEEN 10001 AND 10200;

SELECT
    canal_entrega,
    COUNT(*) AS total
FROM ordenes
WHERE id_cliente BETWEEN 10001 AND 10200
GROUP BY canal_entrega
ORDER BY canal_entrega;



