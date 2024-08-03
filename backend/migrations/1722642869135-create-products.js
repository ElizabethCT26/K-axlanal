'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `CREATE TABLE productos(
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
    `;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error running migration at: ${chalk.cyan(filename)} > ${chalk.cyan('up')}`);
      throw err;
    }
    next();
  });
};

export const down = function (next) {
  const sql = `DROP TABLE `;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error running migration at: ${chalk.cyan(filename)} > ${chalk.cyan('down')}`);
      throw err;
    }
    next();
  });
};
