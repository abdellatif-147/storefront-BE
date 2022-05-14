import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_test_DB,
  ENV,
} = process.env;
let client: Pool = new Pool({});
if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    port: POSTGRES_PORT as unknown as number,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_test_DB,
    port: POSTGRES_PORT as unknown as number,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
export default client;
