import { join } from 'path';
import { readFileSync } from 'fs';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const filePath = join(process.cwd(), 'public', 'resources', 'logos', 'logo_resaltado.png');
        const fileBuffer = readFileSync(filePath);
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return res.status(200).send(fileBuffer);
    } catch (error) {
        console.error('Error al servir el logo:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
