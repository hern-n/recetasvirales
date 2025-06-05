import { Database } from '@sqlitecloud/drivers';

// Aquí la URL de tu base de datos, puede ser variable de entorno o fija
const dbUrl = "sqlitecloud://cgaa8pjahk.g5.sqlite.cloud:8860/recetas.sqlite?apikey=APxGiL3Qa5ljtr86NfYCJg8Ev08bvBcg77nEmCICvDg";
const db = new Database(dbUrl);

export default async function handler(req, res) {
    console.log('Método:', req.method);
    console.log('Query params:', req.query);

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { id, name, category } = req.query;

    try {
        let query = '';
        let params = [];

        if (id) {
            query = 'SELECT * FROM recetas WHERE id = ?;';
            params = [id];
        } else if (name) {
            query = 'SELECT * FROM recetas WHERE titulo LIKE ?;';
            params = [`%${name}%`];
        } else if (category) {
            query = 'SELECT * FROM recetas WHERE categoria LIKE ?;';
            params = [`%${category}%`];
        } else {
            return res.status(400).json({ error: 'Falta parámetro id, name o category' });
        }

        console.log('Ejecutando consulta:', query, params);

        const result = await db.sql(query, params);

        console.log('Resultado de la consulta:', result);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error en API /api/database:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
