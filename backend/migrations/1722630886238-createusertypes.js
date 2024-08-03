'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';

export const up = function (next) {
  const sql = `CREATE TABLE tipos_usuarios( 
	id INT AUTO_INCREMENT PRIMARY KEY,
	rol VARCHAR (100),
	permisos JSON
  );`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error at running migration: ${chalk.cyan('-createussertypes.js')} > ${chalk.cyan('up')}`);
      throw err;
    }
    next();
  });
};

export const down = function (next) {
  const sql = `DROP TABLE images;`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error at running migration: ${chalk.cyan('-createussertypes.js')} > ${chalk.cyan('down')}`);
      throw err;
    }
    next();
  });
};
