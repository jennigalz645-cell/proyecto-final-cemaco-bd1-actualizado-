SET SERVEROUTPUT ON;

BEGIN
    sp_procesar_checkout_atomico(
        p_id_cliente  => 9001,
        p_id_sucursal => 1,
        p_id_producto => 2,
        p_cantidad    => 1,
        p_canal       => 'Cyber Days - Sesion A',
        p_id_pasarela => 1
    );

    DBMS_OUTPUT.PUT_LINE('Sesion A: compra procesada. No ejecute COMMIT todavia.');
END;
/

