'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `CREATE VIEW view_liked_stores AS
    SELECT inte.id_usuario, t.id , t.nombre 
      AS tienda, t.descripcion, t.eslogan, t.popularidad, t.id_propietario, u.nombre AS propietario,  u.apellido AS apellido,
      t.contacto, t.fecha, t.id_areaComercial, a.nombre AS area_comercial, 
      t.id_img, i.id AS id_images, i.profile_path, i.banner_path
      FROM interesados AS inte
        LEFT JOIN tiendas as t ON t.id = inte.id_tienda
      LEFT JOIN users AS u ON t.id_propietario = u.id
      LEFT JOIN area_comercial AS a ON t.id_areaComercial = a.id
      LEFT JOIN images as i ON t.id_img = i.id; 
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
