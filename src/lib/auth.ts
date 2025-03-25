import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins"

import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from "../config";
import { db } from "src/database";
 
export const auth = betterAuth({
  database: {
    type: "postgres",
    db: db,
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
        defaultValue: "apellido",
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "rol",
      }
    },
    deleteUser: { 
      enabled: true
    } 
  },
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL,
});