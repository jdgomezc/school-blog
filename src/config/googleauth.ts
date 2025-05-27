import { JWT } from "google-auth-library";
import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "astro:env/client";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

export async function authorize() {

  try {
    const authGoogleClient = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: SCOPES,
    });

    await authGoogleClient.authorize(); // Authorize the client
    return authGoogleClient; // Return the JWT client
  } catch (error) {
    console.error("Error authorizing with service account:", error);
    throw error;
  }
}
