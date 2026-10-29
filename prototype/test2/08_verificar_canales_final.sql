
SELECT
    canal_entrega,
    COUNT(*) AS total
FROM ordenes
WHERE id_cliente BETWEEN 10001 AND 10200
GROUP BY canal_entrega
ORDER BY canal_entrega;



