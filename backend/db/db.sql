CREATE DATABASE kaxlanal;
USE kaxlanal;

-- drop database kaxlanal

CREATE TABLE images(
	id INT AUTO_INCREMENT PRIMARY KEY,
	profile_path VARCHAR(255) NOT NULL,
    banner_path VARCHAR(255) 
);


CREATE TABLE tipos_usuarios( 
	id INT AUTO_INCREMENT PRIMARY KEY,
	rol VARCHAR (100),
	permisos JSON
);

INSERT INTO tipos_usuarios(rol) VALUES ("administrador"),
												 ("vendedor"),
                                                 ("cliente");

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(100),
	apellido VARCHAR(100),
    telefono INT,
	id_tipo_usuarios INT NOT NULL,
	correo VARCHAR(100),
	contraseña VARCHAR(100),
    id_img INT,
    preferencias JSON,
		FOREIGN KEY users(id_tipo_usuarios) REFERENCES tipos_usuarios(id),
		FOREIGN KEY image(id_img) REFERENCES images(id)
);

SELECT * FROM users;

INSERT INTO users(nombre, id_tipo_usuarios, correo) VALUES ("Panchito", 2 , "test2@mail.com"); 

CREATE TABLE categorias(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion TEXT,
    popularidad INT
);

INSERT INTO categorias (nombre) VALUES ('Comida');

CREATE TABLE area_comercial(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(200) NOT NULL
);

CREATE TABLE tiendas(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL, 
	id_propietario INT NOT NULL,
	direccion VARCHAR(200), 
    contacto VARCHAR(20),
	id_areaComercial INT,
    id_img INT,
    popularidad INT,
		FOREIGN KEY propietario(id_propietario) REFERENCES users(id),
        FOREIGN KEY area_comercial(id_areaComercial) REFERENCES area_comercial(id),
        FOREIGN KEY img(id_img) REFERENCES images(id)
);

SELECT * FROM tiendas WHERE id_propietario = 1;


INSERT INTO tiendas (nombre, id_propietario, contacto) VALUES ("Tienda 2", 1, '9983242074');
INSERT INTO categorias (nombre, descripcion) VALUES ("Categoria placeholder", "Es una categoria placeholder, nada que ver aqui");

CREATE TABLE direccion(
	id INT AUTO_INCREMENT PRIMARY KEY,
	calle VARCHAR (100), 
	avenida VARCHAR (100),
    manzana VARCHAR (100),
    lote VARCHAR (100),
    referencia VARCHAR (100),
	id_usuario INT,
		FOREIGN KEY usuario(id_usuario) REFERENCES users(id)
);

CREATE TABLE productos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR (100), 
	precio DECIMAL(10,2),
    descuento INT,
    cantidad INT,
	descripcion TEXT, 
    popularidad INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    img_path TEXT,
	id_tienda INT NOT NULL, 
	id_categoria INT,
		FOREIGN KEY tienda(id_tienda) REFERENCES tiendas(id),
		FOREIGN KEY categoria(id_categoria) REFERENCES categorias(id)
);

CREATE TABLE favoritos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT NOT NULL,
	id_producto INT NOT NULL,
		FOREIGN KEY usuario(id_usuario) REFERENCES users(id),
        FOREIGN KEY producto(id_producto) REFERENCES productos(id)
);

CREATE TABLE interesados(
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT NOT NULL,
	id_tienda INT NOT NULL,
		FOREIGN KEY usuario(id_usuario) REFERENCES users(id),
        FOREIGN KEY tienda(id_tienda) REFERENCES tiendas(id)
);


SELECT * FROM users WHERE nombre = 'oa';

INSERT INTO productos (nombre, precio, cantidad, popularidad, id_tienda, img_path) VALUES ('Panchos de Cocodrilo',10.50,10,1,1, '/uploads/cocodrilo.jpg'),
																				('Panchos de Salchicha',11.99,9,2,1, '/uploads/normal.jpg'),
																				('Panchos de Carne',15.99,90,3,1, '/uploads/res.jpg'),
																				('Panchos de Pollo',10,15,5,1, '/uploads/cerdo.jpg'),
																				('Panchos de Cerdo',12.33,12,6,1, '/uploads/cerdo.jpg');

SELECT * FROM productos ORDER BY popularidad DESC;

CREATE VIEW view_products AS
SELECT p.id, p.nombre, p.precio, p.cantidad, p.descuento, p.descripcion, p.popularidad, p.fecha, p.img_path, 
		t.nombre AS tienda, t.id AS id_tienda, t.contacto,
		c.nombre AS categoria, c.id AS id_categoria FROM productos AS p 
        LEFT JOIN tiendas AS t ON p.id_tienda = t.id 
        LEFT JOIN categorias AS c ON p.id_categoria = c.id; 

SELECT * FROM view_products ORDER BY fecha DESC;
SELECT * FROM view_products WHERE descuento > 0 ORDER BY fecha DESC;

SELECT * FROM images;

CREATE VIEW view_profile AS 
SELECT u.id, u.nombre, u.apellido, u.id_img, i.profile_path, i.banner_path FROM users AS u 
LEFT JOIN images AS i ON u.id_img = i.id;