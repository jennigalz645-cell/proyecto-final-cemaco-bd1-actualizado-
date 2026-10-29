
SELECT
    c.table_name,
    cc.column_name,
    c.constraint_name,
    c.constraint_type,
    c.r_constraint_name,
    rc.table_name AS tabla_referenciada,
    rcc.column_name AS columna_referenciada
FROM user_constraints c
LEFT JOIN user_cons_columns cc
    ON c.constraint_name = cc.constraint_name
    AND c.table_name = cc.table_name
LEFT JOIN user_constraints rc
    ON c.r_constraint_name = rc.constraint_name
LEFT JOIN user_cons_columns rcc
    ON rc.constraint_name = rcc.constraint_name
    AND cc.position = rcc.position
WHERE c.table_name IN (
    'ORDENES',
    'TRANSACCIONES_PAGO',
    'INVENTARIO',
    'PRODUCTOS',
    'SUCURSALES',
    'DETALLE_PEDIDO',
    'DETALLE_PEDIDOS',
    'PEDIDO',
    'PEDIDOS'
)
ORDER BY c.table_name, c.constraint_type, c.constraint_name, cc.position;

SELECT
    table_name,
    column_id,
    column_name,
    data_type,
    nullable
FROM user_tab_columns
WHERE table_name IN (
    'ORDENES',
    'TRANSACCIONES_PAGO',
    'INVENTARIO',
    'PRODUCTOS',
    'SUCURSALES'
)
ORDER BY table_name, column_id;

