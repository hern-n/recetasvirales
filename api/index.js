import { join } from 'path';
import { readFileSync } from 'fs';

export default function handler(req, res) {
    // Solo permitimos GET
    if (req.method !== 'GET') {
        res.status(405).send('Método no permitido');
        return;
    }

    // Enviar el index.html
    const filePath = join(process.cwd(), 'public', 'index.html');
    const html = readFileSync(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
