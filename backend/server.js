import express from 'express';
import chalk from 'chalk'
import morgan from 'morgan';
import https from 'https'
import fs from 'fs'
import cors from 'cors';
import routes from './routes.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem')
}

const port = 8082;
const address = 'localhost';

const app = express();

//app.listen(port, address, () => {
//    console.log('Server has been setup on port:', port);
//    console.log('With the IP address:', address);
//});

https.createServer(options, app).listen(port, address, () => {
    console.log(`${chalk.cyan('Https')} server has been setup on port:`, port);
    console.log('With the IP address:', chalk.cyan(address));
});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use('/', routes);

export default app;
