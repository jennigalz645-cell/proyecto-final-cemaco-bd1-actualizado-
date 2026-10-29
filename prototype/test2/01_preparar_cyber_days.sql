SET SERVEROUTPUT ON;

SELECT i.id_sucursal, i.id_producto, p.nombre,
       i.stock_disponible, i.stock_reservado
FROM inventario i
JOIN productos p ON p.id_producto = i.id_producto
WHERE i.id_sucursal = 1 AND i.id_producto = 2;

DECLARE
    v_filas NUMBER;
BEGIN
    UPDATE inventario
    SET stock_disponible = 1,
        stock_reservado = 0
    WHERE id_sucursal = 1
      AND id_producto = 2;

    v_filas := SQL%ROWCOUNT;

    IF v_filas = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20010,
            'No existe inventario para sucursal 1 y producto 2. Verifique los datos iniciales.'
        );
    END IF;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Cyber Days preparado: stock inicial = 1 unidad.');
END;
/

SELECT i.id_sucursal, i.id_producto, p.nombre,
       i.stock_disponible, i.stock_reservado
FROM inventario i
JOIN productos p ON p.id_producto = i.id_producto
WHERE i.id_sucursal = 1 AND i.id_producto = 2;
