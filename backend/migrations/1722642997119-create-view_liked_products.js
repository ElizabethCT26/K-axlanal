'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `CREATE VIEW view_liked_products AS
    SELECT f.id_usuario, p.id, p.nombre, p.precio, p.cantidad, p.descripcion, p.popularidad, p.fecha, p.img_path, 
        d.porcentaje, d.id_estado,
        t.nombre AS tienda, t.id AS id_tienda, t.id_propietario, t.contacto,
        c.nombre AS categoria, c.id AS id_categoria FROM favoritos AS f 
            LEFT JOIN productos AS p ON f.id_producto = p.id
            LEFT JOIN descuentos AS d ON p.id = d.id_producto
            LEFT JOIN tiendas AS t ON p.id_tienda = t.id 
        LEFT JOIN categorias AS c ON p.id_categoria = c.id; 
        
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
