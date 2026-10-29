
SET DEFINE OFF;

SET AUTOCOMMIT OFF;

SELECT
    id_sucursal,
    id_producto,
    stock_disponible
FROM inventario
WHERE id_sucursal = 1
  AND id_producto = 2
FOR UPDATE;


