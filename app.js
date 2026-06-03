import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './midleware/errorHandler.js';
import path from 'path';
import {fileURLToPath} from 'url';
import router from './routes/auth.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running perfectly with ES Modules!' });
});

app.use((req, res, next) => {
    res.status(404).json({ status: 'error', message: 'Resource not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});

