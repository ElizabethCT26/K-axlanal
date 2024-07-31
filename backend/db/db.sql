CREATE DATABASE kaxlanal;
USE kaxlanal;

-- drop database kaxlanal

CREATE TABLE images(
	id INT AUTO_INCREMENT PRIMARY KEY,
	profile_path VARCHAR(255),
    banner_path VARCHAR(255) ,
    mainBanner BOOLEAN DEFAULT FALSE,
    mainSlider BOOLEAN DEFAULT FALSE
);


CREATE TABLE tipos_usuarios( 
	id INT AUTO_INCREMENT PRIMARY KEY,
	rol VARCHAR (100),
	permisos JSON
);

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(100),
	apellido VARCHAR(100),
    descripcion TEXT,
    telefono VARCHAR(20),
	id_tipo_usuarios INT NOT NULL,
	correo VARCHAR(100),
    isItVerified BOOLEAN DEFAULt FALSE,
    mailToken VARCHAR (100),
	contraseña VARCHAR(100),
    id_img INT,
    preferencias JSON,
		FOREIGN KEY users(id_tipo_usuarios) REFERENCES tipos_usuarios(id),
		FOREIGN KEY image(id_img) REFERENCES images(id)
);

SELECT * FROM users WHERE correo = 'paco2@gmail.com' AND  isItVerified = true;

UPDATE users SET contraseña = 'pato' WHERE correo = '22393264@utcancun.edu.mx'

CREATE TABLE categorias(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion TEXT,
    popularidad INT
);

CREATE TABLE area_comercial(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(200) NOT NULL
);

CREATE TABLE tiendas(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) , 
    descripcion TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    contacto VARCHAR(20),
    popularidad INT,
    eslogan TEXT,
	id_propietario INT,
    id_areaComercial INT,
    id_img INT,
		FOREIGN KEY (id_propietario) REFERENCES users(id),
        FOREIGN KEY (id_areaComercial) REFERENCES area_comercial(id),
        FOREIGN KEY (id_img) REFERENCES images(id)
);

CREATE TABLE direccion(
	id INT AUTO_INCREMENT PRIMARY KEY,
	direccion_completa VARCHAR (100), 
	avenida VARCHAR (100),
    calle VARCHAR (100),
    codigo_postal INT,
    latitude VARCHAR(100),
    longitude VARCHAR(100),
	id_tienda INT,
		FOREIGN KEY (id_tienda) REFERENCES tiendas(id) ON DELETE CASCADE
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
		FOREIGN KEY tienda(id_tienda) REFERENCES tiendas(id) ON DELETE CASCADE,
		FOREIGN KEY categoria(id_categoria) REFERENCES categorias(id)
);

CREATE TABLE estados(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE descuentos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
	porcentaje INT NOT NULL,
    id_estado INT,
		FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
        FOREIGN KEY (id_estado) REFERENCES estados(id) ON DELETE CASCADE
);

CREATE TABLE favoritos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT NOT NULL,
	id_producto INT NOT NULL,
		FOREIGN KEY usuario(id_usuario) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY producto(id_producto) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE interesados(
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT NOT NULL,
	id_tienda INT NOT NULL,
		FOREIGN KEY usuario(id_usuario) REFERENCES users(id),
        FOREIGN KEY tienda(id_tienda) REFERENCES tiendas(id) 
);

CREATE TABLE notifications(
id INT AUTO_INCREMENT PRIMARY KEY,
message TEXT,
id_user INT,
id_store INT,
id_product INT,
publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
read_date DATETIME,
	FOREIGN KEY (id_store) REFERENCES tiendas(id),
    FOREIGN KEY (id_product) REFERENCES productos(id),
    FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE VIEW view_products AS
SELECT p.id, p.nombre, p.precio, p.cantidad, p.descripcion, p.popularidad, p.fecha, p.img_path, 
		d.porcentaje, d.id_estado,
		t.nombre AS tienda, t.id AS id_tienda, t.id_propietario, t.contacto,
		c.nombre AS categoria, c.id AS id_categoria FROM productos AS p 
        LEFT JOIN descuentos AS d ON p.id = d.id_producto
        LEFT JOIN tiendas AS t ON p.id_tienda = t.id 
        LEFT JOIN categorias AS c ON p.id_categoria = c.id; 


 -- DROP VIEW view_profile
CREATE VIEW view_profile AS 
SELECT u.id, u.nombre, u.apellido, u.descripcion, u.telefono ,u.correo, u.id_img, u.id_tipo_usuarios,i.profile_path, i.banner_path FROM users AS u 
LEFT JOIN images AS i ON u.id_img = i.id;

CREATE VIEW view_stores AS
SELECT t.id , t.nombre 
AS tienda, t.descripcion, t.eslogan, t.popularidad, t.id_propietario, u.nombre AS propietario,  u.apellido AS apellido,
 t.contacto, t.fecha, t.id_areaComercial, a.nombre AS area_comercial, 
t.id_img, i.id AS id_images, i.profile_path, i.banner_path
FROM tiendas AS t
LEFT JOIN users AS u ON t.id_propietario = u.id
LEFT JOIN area_comercial AS a ON t.id_areaComercial = a.id
LEFT JOIN images as i ON t.id_img = i.id;

CREATE VIEW view_liked_products AS
SELECT f.id_usuario, p.id, p.nombre, p.precio, p.cantidad, p.descripcion, p.popularidad, p.fecha, p.img_path, 
		d.porcentaje, d.id_estado,
		t.nombre AS tienda, t.id AS id_tienda, t.id_propietario, t.contacto,
		c.nombre AS categoria, c.id AS id_categoria FROM favoritos AS f 
        LEFT JOIN productos AS p ON f.id_producto = p.id
        LEFT JOIN descuentos AS d ON p.id = d.id_producto
        LEFT JOIN tiendas AS t ON p.id_tienda = t.id 
        LEFT JOIN categorias AS c ON p.id_categoria = c.id; 
        
CREATE VIEW view_liked_stores AS
SELECT inte.id_usuario, t.id , t.nombre 
	AS tienda, t.descripcion, t.eslogan, t.popularidad, t.id_propietario, u.nombre AS propietario,  u.apellido AS apellido,
	 t.contacto, t.fecha, t.id_areaComercial, a.nombre AS area_comercial, 
	t.id_img, i.id AS id_images, i.profile_path, i.banner_path
	FROM interesados AS inte
    LEFT JOIN tiendas as t ON t.id = inte.id_tienda
	LEFT JOIN users AS u ON t.id_propietario = u.id
	LEFT JOIN area_comercial AS a ON t.id_areaComercial = a.id
	LEFT JOIN images as i ON t.id_img = i.id; 

CREATE VIEW view_directions AS
SELECT d.*, t.nombre AS tienda FROM direccion AS d LEFT JOIN tiendas AS t ON t.id = d.id_tienda;

