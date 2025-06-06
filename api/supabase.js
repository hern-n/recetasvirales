import postgres from 'postgres';

// Conexión a Supabase (usa DATABASE_URL del .env)
const sql = postgres(process.env.DATABASE_URL);

export default sql;
