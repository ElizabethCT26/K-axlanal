import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if(err){
        console.error('Error de conexión' + err.stack)
        return;
    } 
    
})

export default connection