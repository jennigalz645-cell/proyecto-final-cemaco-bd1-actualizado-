CREATE OR REPLACE PROCEDURE sp_validar_cliente_checkout (
    p_id_cliente IN NUMBER
)
AS
    v_existe NUMBER;
BEGIN
    IF p_id_cliente IS NULL THEN
        RAISE_APPLICATION_ERROR(
            -20011,
            'El ID del cliente es obligatorio.'
        );
    END IF;

    SELECT COUNT(*)
    INTO v_existe
    FROM CLIENTE
    WHERE ID_CLIENTE = p_id_cliente;

    IF v_existe = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20012,
            'El cliente no existe.'
        );
    END IF;
END;
/

