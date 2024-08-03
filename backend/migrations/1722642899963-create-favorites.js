'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `CREATE TABLE favoritos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
        FOREIGN KEY usuario(id_usuario) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY producto(id_producto) REFERENCES productos(id) ON DELETE CASCADE
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
