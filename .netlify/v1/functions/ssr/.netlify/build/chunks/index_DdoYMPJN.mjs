import pkg from 'pg';
import { PostgresDialect, Kysely } from 'kysely';
import { D as DB_PASSWORD, b as DB_USER, c as DB_NAME, d as DB_PORT, e as DB_HOST } from './client_550KDs2Y.mjs';
import 'google-auth-library';

const { Pool } = pkg;
const dialect = new PostgresDialect({
  pool: new Pool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    max: 10,
    ssl: {
      rejectUnauthorized: false
    }
  })
});
const db = new Kysely({
  dialect
});

export { db as d };
