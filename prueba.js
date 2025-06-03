import { Database } from '@sqlitecloud/drivers';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.SQLITECLOUD_URL;
const db = new Database(dbUrl);

async function testConnection() {
    try {
        const result = await db.sql('SELECT 1 AS test;');

        if (result && result[0]?.test === 1) {
            console.log('✅ Conexión a la base de datos exitosa');
        } else {
            console.log('❌ Conexión fallida (respuesta inesperada)', result);
        }
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
    }
}

testConnection();
