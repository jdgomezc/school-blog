import { createAuthClient } from "better-auth/client";
import {
  usernameClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { APP_URL } from "@/config/env";

// import { BETTER_AUTH_URL } from "../config"

const authClient = createAuthClient({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    usernameClient(),
    inferAdditionalFields({
      user: {
        surname: {
          type: "string",
        },

        role: {
          type: "string",
        },
      },
    }),
  ],
  baseURL: APP_URL,
});

export default authClient;
