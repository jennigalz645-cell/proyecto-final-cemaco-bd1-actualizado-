
UPDATE ordenes
SET canal_entrega = 'Click ' || CHR(38) || ' Collect'
WHERE id_cliente BETWEEN 10001 AND 10200
  AND TRIM(canal_entrega) = 'Click';

COMMIT;

SELECT
    canal_entrega,
    COUNT(*) AS total
FROM ordenes
WHERE id_cliente BETWEEN 10001 AND 10200
GROUP BY canal_entrega
ORDER BY canal_entrega;

SELECT COUNT(*) AS total_ordenes_prueba
FROM ordenes
WHERE id_cliente BETWEEN 10001 AND 10200;

