import { supabase } from './supabase.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { id, name, category } = req.query;

    try {
        let query = supabase.from('recetas').select('*');

        if (id) {
            query = query.eq('id', id);
        } else if (name) {
            query = query.ilike('titulo', `%${name}%`);
        } else if (category) {
            query = query.ilike('categoria', `%${category}%`);
        } else {
            return res.status(400).json({ error: 'Falta parámetro id, name o category' });
        }

        const { data, error } = await query;

        if (error) throw error;

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados' });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error en API /api/recetas:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
