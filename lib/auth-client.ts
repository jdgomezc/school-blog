import { createAuthClient } from "better-auth/client"
import { usernameClient, inferAdditionalFields } from "better-auth/client/plugins"

import { BETTER_AUTH_URL } from "../config"

export const authClient = createAuthClient({
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        usernameClient(),
        inferAdditionalFields({
            user: {
              surname: {
                type: "string"
              }
            }
        })
    ],
    baseURL: BETTER_AUTH_URL
})