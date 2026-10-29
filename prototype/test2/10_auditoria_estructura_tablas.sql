
SELECT
    table_name,
    column_id,
    column_name,
    data_type,
    data_length,
    nullable
FROM user_tab_columns
WHERE table_name IN (
    'SUCURSALES',
    'PRODUCTOS',
    'INVENTARIO',
    'PASARELAS_PAGO',
    'ORDENES',
    'TRANSACCIONES_PAGO'
)
ORDER BY table_name, column_id;



