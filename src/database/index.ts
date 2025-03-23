import pkg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { Generated } from "kysely";

const { Pool } = pkg;

import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from "../config";

interface Database {
  user: {
    id: Generated<number>;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    surname: string;
  };

  post: {
    post_id: Generated<number>;
    usuario_id: number;
    texto: string;
    fecha_creacion: Generated<Date>;
    imagen_url: string;
    pdf_uri: string;
    pdf_descarga: string;
    tipo_publicacion: 'POST' | 'ANNOUNCEMENT' | 'MEETING' | 'SCHEDULE';
  }
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
