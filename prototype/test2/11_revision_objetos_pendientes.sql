SELECT table_name
FROM user_tables
ORDER BY table_name;

SELECT
    sequence_name
FROM user_sequences
ORDER BY sequence_name;

SELECT
    constraint_name,
    table_name,
    constraint_type,
    status
FROM user_constraints
WHERE table_name IN (
    'INVENTARIO',
    'ORDENES',
    'PRODUCTOS',
    'TRANSACCIONES_PAGO'
)
ORDER BY table_name, constraint_type;





