SET SERVEROUTPUT ON;

BEGIN
    sp_procesar_checkout_atomico(
        p_id_cliente  => -999999,
        p_id_sucursal => 1,
        p_id_producto => 1,
        p_cantidad    => 1,
        p_canal       => 'RECOGER',
        p_id_pasarela => 1
    );

    DBMS_OUTPUT.PUT_LINE('ERROR: se aceptó un cliente inexistente.');

EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE = -20012 THEN
            DBMS_OUTPUT.PUT_LINE(
                'CORRECTO: el checkout rechazó al cliente inexistente.'
            );
        ELSE
            DBMS_OUTPUT.PUT_LINE('Código de error: ' || SQLCODE);
            DBMS_OUTPUT.PUT_LINE('Detalle: ' || SQLERRM);
        END IF;
END;
/