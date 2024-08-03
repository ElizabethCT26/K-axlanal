'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `CREATE TABLE notifications(
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
