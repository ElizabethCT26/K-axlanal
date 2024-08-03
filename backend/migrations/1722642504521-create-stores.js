'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `CREATE TABLE tiendas(
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
  const sql = ``;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error running migration at: ${chalk.cyan(filename)} > ${chalk.cyan('down')}`);
      throw err;
    }
    next();
  });
};
