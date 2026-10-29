SET SERVEROUTPUT ON;

BEGIN
    sp_procesar_checkout_atomico(
        p_id_cliente  => 9002,
        p_id_sucursal => 1,
        p_id_producto => 2,
        p_cantidad    => 1,
        p_canal       => 'Cyber Days - Sesion B',
        p_id_pasarela => 1
    );

    DBMS_OUTPUT.PUT_LINE('Sesion B: compra procesada.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Sesion B no pudo completar la compra: ' || SQLERRM);
        RAISE;
END;
/

-- Resultado esperado:
-- B espera mientras A mantiene el bloqueo de la fila.
-- Después del COMMIT de A, B debe comprobar el stock actualizado y fallar
-- por inventario insuficiente.
