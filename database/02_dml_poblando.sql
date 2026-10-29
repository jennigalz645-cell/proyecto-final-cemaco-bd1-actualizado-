
SET DEFINE OFF;


INSERT INTO sucursales (
    id_sucursal, nombre, tipo, direccion
)
VALUES (
    seq_sucursales.NEXTVAL,
    'Plaza CEMACO Z.10',
    'Tienda Fisica',
    'Zona 10, Ciudad de Guatemala'
);

INSERT INTO sucursales (
    id_sucursal, nombre, tipo, direccion
)
VALUES (
    seq_sucursales.NEXTVAL,
    'CEMACO Peri-Roosevelt',
    'Tienda Fisica',
    'Calzada Roosevelt, Guatemala'
);

INSERT INTO sucursales (
    id_sucursal, nombre, tipo, direccion
)
VALUES (
    seq_sucursales.NEXTVAL,
    'Central de Distribucion Amatitlan',
    'Bodega Central',
    'Amatitlan'
);


INSERT INTO pasarelas_pago (
    id_pasarela, nombre, porcentaje_comision
)
VALUES (
    seq_pasarelas.NEXTVAL, 'VisaNet', 3.50
);

INSERT INTO pasarelas_pago (
    id_pasarela, nombre, porcentaje_comision
)
VALUES (
    seq_pasarelas.NEXTVAL, 'Cuotas BAC', 4.00
);

INSERT INTO pasarelas_pago (
    id_pasarela, nombre, porcentaje_comision
)
VALUES (
    seq_pasarelas.NEXTVAL, 'Puntos Privilegio', 0.00
);

INSERT INTO pasarelas_pago (
    id_pasarela, nombre, porcentaje_comision
)
VALUES (
    seq_pasarelas.NEXTVAL, 'Efectivo contra entrega', 0.00
);


INSERT INTO productos (
    id_producto, sku, nombre, departamento, precio
)
VALUES (
    seq_productos.NEXTVAL,
    'FER-001',
    'Taladro Percutor 1/2"',
    'Ferreteria',
    650.00
);

INSERT INTO productos (
    id_producto, sku, nombre, departamento, precio
)
VALUES (
    seq_productos.NEXTVAL,
    'FER-002',
    'Barbacoa a Gas de Acero',
    'Ferreteria',
    2500.00
);

INSERT INTO productos (
    id_producto, sku, nombre, departamento, precio
)
VALUES (
    seq_productos.NEXTVAL,
    'HOG-001',
    'Juego de Sabanas King Size',
    'Hogar',
    320.00
);

INSERT INTO productos (
    id_producto, sku, nombre, departamento, precio
)
VALUES (
    seq_productos.NEXTVAL,
    'HOG-002',
    'Set de Ollas de Acero Inoxidable',
    'Hogar',
    899.00
);

INSERT INTO productos (
    id_producto, sku, nombre, departamento, precio
)
VALUES (
    seq_productos.NEXTVAL,
    'ELE-001',
    'Refrigeradora Inverter 14 Pies',
    'Electrodomesticos',
    4500.00
);


INSERT INTO inventario (
    id_inventario,
    id_sucursal,
    id_producto,
    stock_disponible,
    stock_reservado
)
VALUES (
    seq_inventario.NEXTVAL, 1, 1, 10, 0
);

INSERT INTO inventario (
    id_inventario,
    id_sucursal,
    id_producto,
    stock_disponible,
    stock_reservado
)
VALUES (
    seq_inventario.NEXTVAL, 1, 2, 1, 0
);

INSERT INTO inventario (
    id_inventario,
    id_sucursal,
    id_producto,
    stock_disponible,
    stock_reservado
)
VALUES (
    seq_inventario.NEXTVAL, 1, 3, 15, 0
);

INSERT INTO inventario (
    id_inventario,
    id_sucursal,
    id_producto,
    stock_disponible,
    stock_reservado
)
VALUES (
    seq_inventario.NEXTVAL, 2, 1, 8, 0
);

INSERT INTO inventario (
    id_inventario,
    id_sucursal,
    id_producto,
    stock_disponible,
    stock_reservado
)
VALUES (
    seq_inventario.NEXTVAL, 2, 4, 12, 0
);

INSERT INTO inventario (
    id_inventario,
    id_sucursal,
    id_producto,
    stock_disponible,
    stock_reservado
)
VALUES (
    seq_inventario.NEXTVAL, 3, 5, 25, 0
);

COMMIT;


SELECT * FROM sucursales ORDER BY id_sucursal;
SELECT * FROM pasarelas_pago ORDER BY id_pasarela;
SELECT * FROM productos ORDER BY id_producto;

SELECT
    i.id_sucursal,
    s.nombre AS sucursal,
    i.id_producto,
    p.nombre AS producto,
    i.stock_disponible,
    i.stock_reservado
FROM inventario i
JOIN sucursales s
    ON s.id_sucursal = i.id_sucursal
JOIN productos p
    ON p.id_producto = i.id_producto
ORDER BY i.id_sucursal, i.id_producto;
