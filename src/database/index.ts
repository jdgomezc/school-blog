import pkg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { Generated } from "kysely";

const { Pool } = pkg;

import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from "../config";

interface Database {
  // usuarios: {
  //   usuario_id: Generated<number>;
  //   fecha_creacion: Generated<Date>;
  //   nombre: string;
  //   apellido: string;
  //   password: string;
  //   username: string;
  // };
}

const dialect = new PostgresDialect({
  pool: new Pool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    max: 10,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
