
SET DEFINE OFF;

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE transacciones_pago CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE ordenes CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE pasarelas_pago CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE inventario CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE productos CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE sucursales CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP SEQUENCE seq_sucursales';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -2289 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP SEQUENCE seq_productos';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -2289 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP SEQUENCE seq_inventario';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -2289 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP SEQUENCE seq_pasarelas';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -2289 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP SEQUENCE seq_ordenes';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -2289 THEN RAISE; END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP SEQUENCE seq_transacciones';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -2289 THEN RAISE; END IF;
END;
/

CREATE SEQUENCE seq_sucursales START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE seq_productos START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE seq_inventario START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE seq_pasarelas START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE seq_ordenes START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE seq_transacciones START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE TABLE sucursales (
    id_sucursal NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    tipo VARCHAR2(30) NOT NULL,
    direccion VARCHAR2(200) NOT NULL
);

CREATE TABLE productos (
    id_producto NUMBER PRIMARY KEY,
    sku VARCHAR2(50) NOT NULL UNIQUE,
    nombre VARCHAR2(100) NOT NULL,
    departamento VARCHAR2(30) NOT NULL,
    precio NUMBER(10,2) NOT NULL,
    CONSTRAINT chk_producto_precio CHECK (precio >= 0)
);

CREATE TABLE inventario (
    id_inventario NUMBER PRIMARY KEY,
    id_sucursal NUMBER NOT NULL,
    id_producto NUMBER NOT NULL,
    stock_disponible NUMBER NOT NULL,
    stock_reservado NUMBER DEFAULT 0 NOT NULL,
    CONSTRAINT fk_inv_sucursal
        FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal),
    CONSTRAINT fk_inv_producto
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    CONSTRAINT uq_inv_sucursal_producto
        UNIQUE (id_sucursal, id_producto),
    CONSTRAINT chk_inv_disponible CHECK (stock_disponible >= 0),
    CONSTRAINT chk_inv_reservado CHECK (stock_reservado >= 0)
);

CREATE TABLE pasarelas_pago (
    id_pasarela NUMBER PRIMARY KEY,
    nombre VARCHAR2(50) NOT NULL,
    porcentaje_comision NUMBER(5,2) NOT NULL,
    CONSTRAINT chk_pasarela_comision
        CHECK (porcentaje_comision BETWEEN 0 AND 100)
);

CREATE TABLE ordenes (
    id_orden NUMBER PRIMARY KEY,
    id_cliente NUMBER NOT NULL,
    id_sucursal NUMBER NOT NULL,
    canal_entrega VARCHAR2(30) NOT NULL,
    fecha_orden DATE DEFAULT SYSDATE NOT NULL,
    estado VARCHAR2(20) DEFAULT 'Pendiente' NOT NULL,
    total_bruto NUMBER(10,2) NOT NULL,
    CONSTRAINT fk_ord_sucursal
        FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal),
    CONSTRAINT chk_orden_total CHECK (total_bruto >= 0)
);

CREATE TABLE transacciones_pago (
    id_transaccion NUMBER PRIMARY KEY,
    id_orden NUMBER NOT NULL,
    id_pasarela NUMBER NOT NULL,
    monto_bruto NUMBER(10,2) NOT NULL,
    comision_pasarela NUMBER(10,2) NOT NULL,
    monto_neto NUMBER(10,2) NOT NULL,
    fecha_pago DATE DEFAULT SYSDATE NOT NULL,
    CONSTRAINT fk_trans_orden
        FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden),
    CONSTRAINT fk_trans_pasarela
        FOREIGN KEY (id_pasarela) REFERENCES pasarelas_pago(id_pasarela),
    CONSTRAINT chk_trans_bruto CHECK (monto_bruto >= 0),
    CONSTRAINT chk_trans_comision CHECK (comision_pasarela >= 0),
    CONSTRAINT chk_trans_neto CHECK (monto_neto >= 0)
);

