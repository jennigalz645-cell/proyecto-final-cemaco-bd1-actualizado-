
SELECT
    table_name,
    column_id,
    column_name,
    data_type,
    nullable
FROM user_tab_columns
WHERE table_name IN (
    'DETALLE_PEDIDO',
    'DETALLE_PEDIDOS',
    'PEDIDO',
    'PEDIDOS',
    'CLIENTE',
    'CARRITOS_COMPRAS',
    'CUPON',
    'DETALLE_CARRITO'
)
ORDER BY table_name, column_id;

SELECT
    table_name,
    constraint_name,
    constraint_type,
    r_constraint_name,
    status
FROM user_constraints
WHERE table_name IN (
    'DETALLE_PEDIDO',
    'DETALLE_PEDIDOS',
    'PEDIDO',
    'PEDIDOS',
    'CLIENTE',
    'CARRITOS_COMPRAS'
)
ORDER BY table_name, constraint_type;

SELECT
    table_name,
    column_name
FROM user_tab_columns
WHERE REGEXP_LIKE(
    column_name,
    'RESERV|LEALTAD|PUNTOS|EXPIRA|VENCIMIENTO|DESCUENTO',
    'i'
)
ORDER BY table_name, column_name;

