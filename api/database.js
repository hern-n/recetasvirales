import { Database } from '@sqlitecloud/drivers';

const dbUrl = process.env.SQLITECLOUD_URL;
const db = new Database(dbUrl);

export default async function handler(req, res) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Método no permitido' });
        }

        const { id, nombre, categoria } = req.query;

        let result;

        if (id) {
            result = await db.sql`SELECT * FROM recetas WHERE id = ${id};`;
            if (result.length === 0) {
                return res.status(404).json({ error: 'Receta no encontrada por ID' });
            }
        } else if (nombre) {
            result = await db.sql`SELECT * FROM recetas WHERE titulo LIKE ${'%' + nombre + '%'};`;
            if (result.length === 0) {
                return res.status(404).json({ error: 'Receta no encontrada por nombre' });
            }
        } else if (categoria) {
            result = await db.sql`SELECT * FROM recetas WHERE categoria = ${categoria};`;
            if (result.length === 0) {
                return res.status(404).json({ error: 'No se encontraron recetas en esa categoría' });
            }
        } else {
            return res.status(400).json({ error: 'Falta parámetro id, nombre o categoria' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error en API /api/database:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
