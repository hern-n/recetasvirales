import { Database } from '@sqlitecloud/drivers';

// Conexión a la base de datos
const dbUrl = "sqlitecloud://cgaa8pjahk.g5.sqlite.cloud:8860/recetas.sqlite?apikey=APxGiL3Qa5ljtr86NfYCJg8Ev08bvBcg77nEmCICvDg";
const db = new Database(dbUrl);

// Función para obtener info según tipo de búsqueda
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

        // Ejecutamos sin parámetros porque el valor ya está en la query
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

// Bloque principal para probar la función
(async () => {
    try {
        const resultado = await getInfo("name", 'tortilla');  // Cambia aquí el tipo y valor si quieres
        console.log("Resultado final:", resultado);
    } catch (error) {
        console.error("Error principal:", error.message);
    }
})();
