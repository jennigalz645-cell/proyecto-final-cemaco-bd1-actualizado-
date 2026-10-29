SET SERVEROUTPUT ON;

DECLARE
    v_id_orden        NUMBER;
    v_id_producto     NUMBER;
    v_id_pasarela     NUMBER;
    v_id_sucursal     NUMBER;
    v_precio          NUMBER(10,2);
    v_comision_pct    NUMBER(5,2);
    v_total           NUMBER(10,2);
    v_comision        NUMBER(10,2);
    v_neto            NUMBER(10,2);
    v_ordenes_creadas NUMBER := 0;
BEGIN
    FOR i IN 1..200 LOOP
        v_id_producto := MOD(i - 1, 20) + 1;
        v_id_sucursal := MOD(i - 1, 3) + 1;
        v_id_pasarela := MOD(i - 1, 4) + 1;

        SELECT precio INTO v_precio
        FROM productos WHERE id_producto = v_id_producto;

        SELECT porcentaje_comision INTO v_comision_pct
        FROM pasarelas_pago WHERE id_pasarela = v_id_pasarela;

        v_total := ROUND(v_precio * (1 + MOD(i, 3)), 2);
        v_comision := ROUND(v_total * v_comision_pct / 100, 2);
        v_neto := ROUND(v_total - v_comision, 2);

        SELECT seq_ordenes.NEXTVAL INTO v_id_orden FROM dual;

        INSERT INTO ordenes (
            id_orden, id_cliente, id_sucursal, canal_entrega,
            fecha_orden, estado, total_bruto
        ) VALUES (
            v_id_orden,
            10000 + i,
            v_id_sucursal,
            CASE MOD(i, 3)
                WHEN 0 THEN 'Delivery'
                WHEN 1 THEN 'Click & Collect'
                ELSE 'Tienda'
            END,
            SYSDATE - MOD(i, 30),
            'Completado',
            v_total
        );

        INSERT INTO transacciones_pago (
            id_transaccion, id_orden, id_pasarela,
            monto_bruto, comision_pasarela, monto_neto
        ) VALUES (
            seq_transacciones.NEXTVAL,
            v_id_orden,
            v_id_pasarela,
            v_total,
            v_comision,
            v_neto
        );

        v_ordenes_creadas := v_ordenes_creadas + 1;
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Ordenes de prueba creadas: ' || v_ordenes_creadas);
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

SELECT COUNT(*) AS total_ordenes_completadas
FROM ordenes
WHERE estado = 'Completado';
