import { Database } from '@sqlitecloud/drivers';

const dbUrl = process.env.SQLITECLOUD_URL;
const db = new Database(dbUrl);

export default async function handler(req, res) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Método no permitido' });
        }
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: 'Falta parámetro id' });
        }

        const result = await db.sql`SELECT * FROM recetas WHERE id = ${id};`;
        if (result.length === 0) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error en API /api/database:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
