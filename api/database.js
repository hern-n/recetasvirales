import { Database } from '@sqlitecloud/drivers';

const dbUrl = process.env.SQLITECLOUD_URL;

// Validación simple de URL para evitar crear base local por defecto
if (!dbUrl) {
    throw new Error('❌ La variable de entorno SQLITECLOUD_URL no está definida');
}

if (!dbUrl.startsWith('wss://')) {
    throw new Error('❌ La URL de conexión debe comenzar con "wss://" para usar @sqlitecloud/drivers');
}

const db = new Database(dbUrl);

export default async function handler(req, res) {
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

        // En @sqlitecloud/drivers el método para ejecutar es .sql()
        const result = await db.sql(query, params);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error en API /api/database:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
