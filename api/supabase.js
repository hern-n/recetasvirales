import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('Falta la variable de entorno DATABASE_URL');
}

const supabase = postgres(connectionString);

export default supabase;
