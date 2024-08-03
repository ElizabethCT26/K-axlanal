'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';

export const up = function (next) {
  const sql = `CREATE TABLE images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_path VARCHAR(255),
    banner_path VARCHAR(255),
    mainBanner BOOLEAN DEFAULT FALSE,
    mainSlider BOOLEAN DEFAULT FALSE
  );`;

  connection.query(sql, (err, res) => {
    if (err) {
      console.error(`Error at running migration: ${chalk.cyan('-createmages.js')} > ${chalk.cyan('up')}`);
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
