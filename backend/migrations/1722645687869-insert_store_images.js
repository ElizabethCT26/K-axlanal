'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `
        INSERT INTO images (profile_path, banner_path) VALUES 
        ('/uploads/','/uploads/'),
        ('/uploads/tommyProf.png','/uploads/tommyBanner.jpg'),
        ('/uploads/augustusBanner.png','/uploads/augustusBanner.png'),
        ('/uploads/','/uploads/'),
        ('/uploads/bueyProf.png','/uploads/bueyBanner.jpg');
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
