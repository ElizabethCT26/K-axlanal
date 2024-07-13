import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 8082;
const address = 'localhost';

const app = express();

app.listen(port, address, () => {
    console.log('Server has been setup on port:', port);
    console.log('With the IP address:', address);
});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use('/', routes);

export default app;
