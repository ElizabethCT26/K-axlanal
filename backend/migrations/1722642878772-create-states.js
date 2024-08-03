'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `CREATE TABLE estados(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
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
