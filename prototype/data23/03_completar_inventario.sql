
SET SERVEROUTPUT ON;

MERGE INTO inventario i
USING (
    SELECT
        (SELECT NVL(MAX(id_inventario), 0) FROM inventario)
        + ROW_NUMBER() OVER (
            ORDER BY s.id_sucursal, p.id_producto
        ) AS id_inventario,
        s.id_sucursal,
        p.id_producto,
        5 + MOD(p.id_producto, 16) AS stock_disponible,
        0 AS stock_reservado
    FROM sucursales s
    CROSS JOIN productos p
    WHERE NOT EXISTS (
        SELECT 1
        FROM inventario existente
        WHERE existente.id_sucursal = s.id_sucursal
          AND existente.id_producto = p.id_producto
    )
) origen
ON (
    i.id_sucursal = origen.id_sucursal
    AND i.id_producto = origen.id_producto
)
WHEN NOT MATCHED THEN
    INSERT (
        id_inventario,
        id_sucursal,
        id_producto,
        stock_disponible,
        stock_reservado
    )
    VALUES (
        origen.id_inventario,
        origen.id_sucursal,
        origen.id_producto,
        origen.stock_disponible,
        origen.stock_reservado
    );

COMMIT;

SELECT COUNT(*) AS total_registros_inventario
FROM inventario;

SELECT
    s.nombre AS sucursal,
    COUNT(i.id_producto) AS productos_con_inventario
FROM sucursales s
LEFT JOIN inventario i
    ON i.id_sucursal = s.id_sucursal
GROUP BY s.id_sucursal, s.nombre
ORDER BY s.id_sucursal;
