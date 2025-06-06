import sql from './supabase.js';

export default async function handler(req, res) {
    console.log('Método:', req.method);
    console.log('Query params:', req.query);

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { id, name, category } = req.query;

    try {
        let result;

        if (id) {
            result = await sql`SELECT * FROM recetas WHERE id = ${id}`;
        } else if (name) {
            result = await sql`SELECT * FROM recetas WHERE titulo ILIKE ${'%' + name + '%'}`;
        } else if (category) {
            result = await sql`SELECT * FROM recetas WHERE categoria ILIKE ${'%' + category + '%'}`;
        } else {
            return res.status(400).json({ error: 'Falta parámetro id, name o category' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error en API /api/recetas:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
