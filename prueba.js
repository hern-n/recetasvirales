import { Database } from '@sqlitecloud/drivers';

const db = new Database("sqlitecloud://cgaa8pjahk.g5.sqlite.cloud:8860/recetas.sqlite?apikey=APxGiL3Qa5ljtr86NfYCJg8Ev08bvBcg77nEmCICvDg");

// Reemplaza <tablename> por el nombre real de tu tabla
const result = await db.sql`SELECT * FROM recetas;`;


console.log(result);