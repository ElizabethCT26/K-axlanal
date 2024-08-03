'use strict';

import dotenv from 'dotenv';
import mysql from 'mysql2';
import chalk from 'chalk';

dotenv.config({ path: 'dev.env' });

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    port: DB_PORT,
    password: DB_PASSWORD,
});

export const up = () => {

    const sql = `CREATE DATABASE ${DB_DATABASE}`;

    connection.query(sql, (err, res) => {
    if (err) {
        const statusCode = err.errno;
        let message = 'undetermined error'

        switch (statusCode) {
            case 1007:
                message = 'Database already exist';
                break;
            
            case 1045:
                message = 'Access denied, credentials may not be correct'
                break;
            
            case -4078:
                message = "Connection refused, port may be busy or isn't the rigth one"
                break;
            
            case -3008:
                message = "Host was not found"
                break;
        }

        console.log(`${chalk.gray('Error at creating database:')} ${chalk.yellow(statusCode)} - ${chalk.red(message)}`);
        process.exit(1);
    }
    console.log(chalk.magenta(`Database ${DB_DATABASE} created successfully.`))
    process.exit(0);

    });
};

up()

export const down = function (next) {
    const db = process.env.DB_DATABASE;
    const sql = `DROP DATABASE ${db}`;

    connection.query(sql, (err, res) => {
    if (err) {
        console.error(`Error at running migration: ${chalk.cyan('-createdatabase.js')} > ${chalk.cyan('down')}`);
        throw err;
    }
    console.log(`Database ${chalk.red(db)} dropped successfully.`);
    next();
    });
};
