
SET SERVEROUTPUT ON;

BEGIN
    sp_validar_cliente_checkout(-999999);
    DBMS_OUTPUT.PUT_LINE('ERROR: se aceptó un cliente inexistente.');

EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE = -20012 THEN
            DBMS_OUTPUT.PUT_LINE('CORRECTO: se rechazó el cliente inexistente.');
        ELSE
            RAISE;
        END IF;
END;
/

