'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';

export const up = function (next) {
  const sql = `CREATE TABLE users(
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
);`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error at running migration: ${chalk.cyan('-createUsers.js')} > ${chalk.cyan('up')}`);
      throw err;
    }
    next();
  });
};

export const down = function (next) {
  const sql = `DROP TABLE images;`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error at running migration: ${chalk.cyan('-createUsers.js')} > ${chalk.cyan('down')}`);
      throw err;
    }
    next();
  });
};
