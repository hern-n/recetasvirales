import postgres from 'postgres';


const DbUrl = "postgresql://postgres.pxglljjronhffzppedqt:Githubhernan1@aws-0-eu-north-1.pooler.supabase.com:5432/postgres"


const connectionString = DbUrl;

if (!connectionString) {
    throw new Error('Falta la variable de entorno DATABASE_URL');
}

const sql = postgres(connectionString);

export default sql;
