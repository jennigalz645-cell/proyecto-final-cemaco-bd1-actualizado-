
SET DEFINE OFF;

CREATE OR REPLACE PROCEDURE sp_procesar_checkout_atomico (
    p_id_cliente IN NUMBER,
    p_id_sucursal IN NUMBER,
    p_id_producto IN NUMBER,
    p_cantidad IN NUMBER,
    p_canal IN VARCHAR2,
    p_id_pasarela IN NUMBER
)
AS
    v_stock NUMBER;
    v_precio NUMBER(10,2);
    v_total NUMBER(10,2);
    v_comision_pct NUMBER(5,2);
    v_monto_comision NUMBER(10,2);
    v_monto_neto NUMBER(10,2);
    v_id_orden NUMBER;
BEGIN
    SAVEPOINT checkout_inicio;

    IF p_id_cliente IS NULL
       OR p_id_sucursal IS NULL
       OR p_id_producto IS NULL
       OR p_id_pasarela IS NULL
       OR p_canal IS NULL
       OR TRIM(p_canal) IS NULL
    THEN
        RAISE_APPLICATION_ERROR(
            -20001,
            'Todos los parametros son obligatorios.'
        );
    END IF;

    IF p_cantidad IS NULL
       OR p_cantidad <= 0
       OR p_cantidad != TRUNC(p_cantidad)
    THEN
        RAISE_APPLICATION_ERROR(
            -20002,
            'La cantidad debe ser un entero mayor que cero.'
        );
    END IF;

    BEGIN
        SELECT stock_disponible
        INTO v_stock
        FROM inventario
        WHERE id_sucursal = p_id_sucursal
          AND id_producto = p_id_producto
        FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(
                -20003,
                'No existe inventario para ese producto y sucursal.'
            );
    END;

    BEGIN
        SELECT precio
        INTO v_precio
        FROM productos
        WHERE id_producto = p_id_producto;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(
                -20004,
                'El producto seleccionado no existe.'
            );
    END;

    IF v_stock < p_cantidad THEN
        RAISE_APPLICATION_ERROR(
            -20005,
            'Stock insuficiente en la sucursal seleccionada.'
        );
    END IF;

    v_total := ROUND(v_precio * p_cantidad, 2);

    BEGIN
        SELECT porcentaje_comision
        INTO v_comision_pct
        FROM pasarelas_pago
        WHERE id_pasarela = p_id_pasarela;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(
                -20006,
                'La pasarela de pago seleccionada no existe.'
            );
    END;

    v_monto_comision := ROUND(
        v_total * v_comision_pct / 100,
        2
    );

    v_monto_neto := ROUND(
        v_total - v_monto_comision,
        2
    );

    UPDATE inventario
    SET stock_disponible = stock_disponible - p_cantidad
    WHERE id_sucursal = p_id_sucursal
      AND id_producto = p_id_producto;

    SELECT seq_ordenes.NEXTVAL
    INTO v_id_orden
    FROM dual;

    INSERT INTO ordenes (
        id_orden,
        id_cliente,
        id_sucursal,
        canal_entrega,
        estado,
        total_bruto
    )
    VALUES (
        v_id_orden,
        p_id_cliente,
        p_id_sucursal,
        p_canal,
        'Completado',
        v_total
    );

    INSERT INTO transacciones_pago (
        id_transaccion,
        id_orden,
        id_pasarela,
        monto_bruto,
        comision_pasarela,
        monto_neto
    )
    VALUES (
        seq_transacciones.NEXTVAL,
        v_id_orden,
        p_id_pasarela,
        v_total,
        v_monto_comision,
        v_monto_neto
    );

    DBMS_OUTPUT.PUT_LINE(
        'Checkout procesado correctamente.'
    );
    DBMS_OUTPUT.PUT_LINE(
        'ID de orden: ' || v_id_orden
    );
    DBMS_OUTPUT.PUT_LINE(
        'Total bruto: ' || TO_CHAR(v_total, 'FM999999990.00')
    );
    DBMS_OUTPUT.PUT_LINE(
        'Comision: ' || TO_CHAR(v_monto_comision, 'FM999999990.00')
    );
    DBMS_OUTPUT.PUT_LINE(
        'Monto neto: ' || TO_CHAR(v_monto_neto, 'FM999999990.00')
    );

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK TO checkout_inicio;
        RAISE;
END;
/

SHOW ERRORS PROCEDURE sp_procesar_checkout_atomico;

