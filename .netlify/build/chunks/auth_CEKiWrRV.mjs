import { betterAuth } from 'better-auth';
import { username } from 'better-auth/plugins';
import { B as BETTER_AUTH_URL, a as BETTER_AUTH_SECRET } from './client_550KDs2Y.mjs';
import 'google-auth-library';
import { d as db } from './index_DdoYMPJN.mjs';

const auth = betterAuth({
  database: {
    type: "postgres",
    db
  },
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    username()
  ],
  user: {
    additionalFields: {
      surname: {
        type: "string",
        required: false,
        defaultValue: "apellido"
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "rol"
      }
    },
    deleteUser: {
      enabled: true
    }
  },
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL
});

export { auth as a };
