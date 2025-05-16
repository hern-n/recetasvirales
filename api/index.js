import { join } from 'path';
import { readFileSync } from 'fs';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send('Método no permitido');
        return;
    }

    const filePath = join(process.cwd(), 'public', 'MainPage', 'index.html');
    const html = readFileSync(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
