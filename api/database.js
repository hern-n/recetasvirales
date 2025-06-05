import { Database } from '@sqlitecloud/drivers';

const dbUrl = "sqlitecloud://cgaa8pjahk.g5.sqlite.cloud:8860/recetas.sqlite?apikey=APxGiL3Qa5ljtr86NfYCJg8Ev08bvBcg77nEmCICvDg";
const db = new Database(dbUrl);

export async function getInfo(tipo, valor) {
    try {
        let query = '';

        if (tipo === 'id') {
            query = `SELECT * FROM recetas WHERE id = ${valor};`;
        } else if (tipo === 'name') {
            query = `SELECT * FROM recetas WHERE titulo LIKE '%${valor}%';`;
        } else if (tipo === 'category') {
            query = `SELECT * FROM recetas WHERE categoria LIKE '%${valor}%';`;
        } else {
            throw new Error('Tipo de búsqueda no válido. Usa "id", "name" o "category".');
        }

        console.log('Ejecutando consulta:', query);

        // Aquí no pasamos params porque ya está todo en el string
        const result = await db.sql(query);

        if (!result || result.length === 0) {
            throw new Error('No se encontraron resultados');
        }

        return result;
    } catch (error) {
        console.error('Error en getInfo():', error);
        throw error;
    }
}

// Ejemplo rápido para probar:
//(async () => {
    try {
        const res = await getInfo('name', 'tortilla');
        console.log('Resultado:', res);
    } catch (error) {
        console.error('Error:', error.message);
    }
//})();
