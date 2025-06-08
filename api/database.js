import sql from './supabase.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { id, name, category, random } = req.query;

    try {
        let result;

        if (id) {
            result = await sql`SELECT * FROM recetas WHERE id = ${id}`;
        } else if (name) {
            result = await sql`SELECT * FROM recetas WHERE titulo ILIKE ${'%' + name + '%'}`;
        } else if (category) {
            result = await sql`SELECT * FROM recetas WHERE categoria ILIKE ${'%' + category + '%'}`;
        } else if (random) {
            const cantidad = parseInt(random);
            if (isNaN(cantidad) || cantidad < 1) {
                return res.status(400).json({ error: 'El parámetro "random" debe ser un número mayor que 0' });
            }

            // Contar cuántas recetas hay en total
            const total = await sql`SELECT COUNT(*) FROM recetas`;
            const totalRecetas = parseInt(total[0].count);

            if (cantidad > totalRecetas) {
                return res.status(400).json({ 
                    error: `Solo hay ${totalRecetas} recetas disponibles, no se pueden devolver ${cantidad}` 
                });
            }

            // Devolver recetas aleatorias
            result = await sql`SELECT * FROM recetas ORDER BY RANDOM() LIMIT ${cantidad}`;
        } else {
            return res.status(400).json({ error: 'Falta parámetro id, name, category o random' });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error en API:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
