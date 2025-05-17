import { Database } from '@sqlitecloud/drivers';

const dbUrl = process.env.SQLITECLOUD_URL;
const db = new Database(dbUrl);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: 'Falta el parámetro id' });
    return;
  }

  try {
    const result = await db.sql`SELECT * FROM recetas WHERE id = ${id};`;
    if (result.length === 0) {
      res.status(404).json({ error: 'Receta no encontrada' });
      return;
    }
    const receta = result[0];
    receta.ingredientes = JSON.parse(receta.ingredientes);
    receta.pasos = JSON.parse(receta.pasos);
    receta.fotos = JSON.parse(receta.fotos);

    res.status(200).json(receta);
  } catch (error) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
}
