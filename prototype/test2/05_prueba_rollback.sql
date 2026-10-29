SET SERVEROUTPUT ON;

PROMPT === STOCK Y ORDENES ANTES DE LA PRUEBA ===
SELECT stock_disponible
FROM inventario
WHERE id_sucursal = 1 AND id_producto = 1;

SELECT COUNT(*) AS ordenes_antes
FROM ordenes
WHERE id_cliente = 9901;

PROMPT === EJECUTAR COMPRA DE PRUEBA Y DESHACERLA ===
BEGIN
    sp_procesar_checkout_atomico(
        p_id_cliente  => 9901,
        p_id_sucursal => 1,
        p_id_producto => 1,
        p_cantidad    => 1,
        p_canal       => 'Prueba Rollback',
        p_id_pasarela => 1
    );
END;
/

ROLLBACK;

PROMPT === VERIFICAR QUE NO QUEDO ORDEN ===
SELECT COUNT(*) AS ordenes_despues_rollback
FROM ordenes
WHERE id_cliente = 9901;

PROMPT === STOCK DESPUES DEL ROLLBACK ===
SELECT stock_disponible
FROM inventario
WHERE id_sucursal = 1 AND id_producto = 1;

-- El conteo de órdenes debe coincidir con el valor anterior y el stock
-- debe volver al valor previo, siempre que no existieran transacciones
-- concurrentes sobre ese mismo inventario durante esta prueba.
