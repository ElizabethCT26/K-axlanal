'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `
        INSERT INTO users(nombre, apellido, id_tipo_usuarios, correo) VALUES 
        ("Francisco", 'Mendez', 2, "f.mendez@gmail.com"),
        ("Tomm", 'Howard', 2, "tommhow@hotmail.com"),
        ("Augusto", 'Marquez', 2, "augusto_81@neocities,com"),
        ("Miguel", 'Menendez', 2, "mmenendez@outlook.com"),
        ("Juan", 'Sierra', 2, "desierra1981@hotmail.com");  
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
