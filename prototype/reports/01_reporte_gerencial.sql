SET LINESIZE 220;
SET PAGESIZE 100;

PROMPT === RESUMEN POR SUCURSAL, CANAL Y PASARELA ===
SELECT o.id_sucursal,
       o.canal_entrega,
       p.nombre AS pasarela,
       COUNT(DISTINCT o.id_orden) AS cantidad_ordenes,
       SUM(t.monto_bruto) AS ingresos_brutos,
       SUM(t.comision_pasarela) AS comisiones,
       SUM(t.monto_neto) AS ingresos_netos
FROM ordenes o
JOIN transacciones_pago t ON t.id_orden = o.id_orden
JOIN pasarelas_pago p ON p.id_pasarela = t.id_pasarela
WHERE o.estado = 'Completado'
GROUP BY o.id_sucursal, o.canal_entrega, p.nombre
ORDER BY o.id_sucursal, o.canal_entrega, p.nombre;

PROMPT === VISTA DE AUDITORIA GERENCIAL ===
SELECT *
FROM vista_auditoria_gerencial
ORDER BY sucursal, canal_entrega, metodo_pago;

PROMPT === INDICADORES GENERALES ===
SELECT COUNT(DISTINCT o.id_orden) AS ordenes_completadas,
       NVL(SUM(t.monto_bruto), 0) AS ingresos_brutos,
       NVL(SUM(t.comision_pasarela), 0) AS comisiones,
       NVL(SUM(t.monto_neto), 0) AS ingresos_netos
FROM ordenes o
JOIN transacciones_pago t ON t.id_orden = o.id_orden
WHERE o.estado = 'Completado';
