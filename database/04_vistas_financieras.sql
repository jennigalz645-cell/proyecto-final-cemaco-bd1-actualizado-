
SET DEFINE OFF;

CREATE OR REPLACE VIEW vista_auditoria_gerencial AS
SELECT
    s.nombre AS sucursal,
    o.canal_entrega,
    p.nombre AS metodo_pago,
    COUNT(DISTINCT o.id_orden) AS total_pedidos,
    SUM(t.monto_bruto) AS ingresos_brutos,
    SUM(t.comision_pasarela) AS total_comisiones,
    SUM(t.monto_neto) AS ingresos_netos_reales
FROM ordenes o
JOIN sucursales s
    ON s.id_sucursal = o.id_sucursal
JOIN transacciones_pago t
    ON t.id_orden = o.id_orden
JOIN pasarelas_pago p
    ON p.id_pasarela = t.id_pasarela
WHERE o.estado = 'Completado'
GROUP BY
    s.nombre,
    o.canal_entrega,
    p.nombre;

SHOW ERRORS VIEW vista_auditoria_gerencial;

SELECT
    sucursal,
    canal_entrega,
    metodo_pago,
    total_pedidos,
    ingresos_brutos,
    total_comisiones,
    ingresos_netos_reales
FROM vista_auditoria_gerencial
ORDER BY
    sucursal,
    canal_entrega,
    metodo_pago;



