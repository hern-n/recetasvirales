// /api/recetas.js
import { Database } from '@sqlitecloud/drivers';

const db = new Database("sqlitecloud://cgaa8pjahk.g5.sqlite.cloud:8860/recetas.sqlite?apikey=APxGiL3Qa5ljtr86NfYCJg8Ev08bvBcg77nEmCICvDg");

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
