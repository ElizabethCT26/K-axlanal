'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `
    INSERT INTO descuentos (id_producto, porcentaje, id_estado) VALUES 
    ( 1, 50, 1),
    ( 6, 55, 1),
    ( 11, 70, 1),
    ( 16, 25, 1),
    ( 21, 30, 1);
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
