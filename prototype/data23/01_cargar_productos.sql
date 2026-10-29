SET SERVEROUTPUT ON;

BEGIN
    MERGE INTO productos p
    USING (
        SELECT 6 id_producto, 'FER-003' sku, 'Juego de destornilladores' nombre, 'Ferreteria' departamento, 145 precio FROM dual
        UNION ALL SELECT 7, 'FER-004', 'Caja de herramientas', 'Ferreteria', 275 FROM dual
        UNION ALL SELECT 8, 'FER-005', 'Taladro inalambrico', 'Ferreteria', 899 FROM dual
        UNION ALL SELECT 9, 'HOG-003', 'Licuadora de vidrio', 'Hogar', 349 FROM dual
        UNION ALL SELECT 10, 'HOG-004', 'Juego de platos 16 piezas', 'Hogar', 299 FROM dual
        UNION ALL SELECT 11, 'HOG-005', 'Lampara de mesa', 'Hogar', 189 FROM dual
        UNION ALL SELECT 12, 'ELE-002', 'Microondas 0.7 pies', 'Electrodomesticos', 799 FROM dual
        UNION ALL SELECT 13, 'ELE-003', 'Cafetera electrica', 'Electrodomesticos', 249 FROM dual
        UNION ALL SELECT 14, 'ELE-004', 'Ventilador de pedestal', 'Electrodomesticos', 399 FROM dual
        UNION ALL SELECT 15, 'JAR-001', 'Manguera para jardin 15 m', 'Jardin', 175 FROM dual
        UNION ALL SELECT 16, 'JAR-002', 'Tijera para podar', 'Jardin', 99 FROM dual
        UNION ALL SELECT 17, 'JAR-003', 'Maceta decorativa', 'Jardin', 85 FROM dual
        UNION ALL SELECT 18, 'LIM-001', 'Aspiradora compacta', 'Limpieza', 699 FROM dual
        UNION ALL SELECT 19, 'LIM-002', 'Set de escobas y trapeador', 'Limpieza', 159 FROM dual
        UNION ALL SELECT 20, 'ORG-001', 'Estanteria metalica' nombre, 'Organizacion' departamento, 499 precio FROM dual
    ) s
    ON (p.id_producto = s.id_producto)
    WHEN MATCHED THEN UPDATE SET
        p.sku = s.sku,
        p.nombre = s.nombre,
        p.departamento = s.departamento,
        p.precio = s.precio
    WHEN NOT MATCHED THEN INSERT
        (id_producto, sku, nombre, departamento, precio)
    VALUES
        (s.id_producto, s.sku, s.nombre, s.departamento, s.precio);

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Catalogo actualizado: productos con ID del 1 al 20.');
END;
/

SELECT COUNT(*) AS total_productos FROM productos;
SELECT id_producto, sku, nombre, departamento, precio
FROM productos
ORDER BY id_producto;
