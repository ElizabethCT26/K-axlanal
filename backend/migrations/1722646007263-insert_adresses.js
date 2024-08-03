'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `
    INSERT INTO direccion (avenida, calle, codigo_postal, latitude, longitude, id_tienda) VALUES 
    ( 'Av.La luna','Puestas del sol', '77500', '21.1656', '-86.8298', 1),
    ( 'Chim','Tierra maya', '77539','21.1410', '-86.9029', 2),
    ( 'Isla galapagos','Paseos del mar', '77519', '21.1720', '-86.9099', 3),
    ( 'El petén','calle 56', '77519', '21.1573', '-86.8837', 4),
    ( 'Av.127 68','Gran santa fe ', '77535', '21.1266', '-86.8723', 5);
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
