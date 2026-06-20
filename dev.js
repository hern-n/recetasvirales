import express from 'express';
import handler from './api/server.js';
import databaseHandler from './api/database.js';
import { join, extname } from 'path';
import { readFileSync, existsSync } from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/database', databaseHandler);

app.use('/api/server', handler);

app.get('/', handler);

const publicDir = join(process.cwd(), 'public');
app.use((req, res, next) => {
    const filePath = join(publicDir, req.path === '/' ? 'MainPage/index.html' : req.path);
    if (existsSync(filePath)) {
        const ext = extname(filePath);
        const mimes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml',
        };
        res.setHeader('Content-Type', mimes[ext] || 'application/octet-stream');
        res.send(readFileSync(filePath));
        return;
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Servidor local: http://localhost:${PORT}`);
});
