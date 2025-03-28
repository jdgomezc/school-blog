import { createAuthClient } from "better-auth/client"
import { usernameClient, inferAdditionalFields } from "better-auth/client/plugins"

// import { BETTER_AUTH_URL } from "../config"

const authClient = createAuthClient({
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        usernameClient(),
        inferAdditionalFields({
            user: {
              surname: {
                type: "string"
              },
              
              role: {
                type: "string"
              }
            }
        })
    ],
    baseURL: "http://localhost:4321"
})

export default authClient