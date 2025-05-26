import { JWT } from "google-auth-library";
import { GOOGLE_SERVICE_ACCOUNT } from "astro:env/client";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

export async function authorize() {
  const buffer = Buffer.from(GOOGLE_SERVICE_ACCOUNT, "base64");
  const serviceAccount = JSON.parse(buffer.toString("utf-8"));

  console.log("serviceAccount:", serviceAccount);

  try {
    const authGoogleClient = new JWT({
      // Use JWT directly
      // keyFile: "./service_account.json",
      key: serviceAccount,
      scopes: SCOPES,
    });

    await authGoogleClient.authorize(); // Authorize the client
    return authGoogleClient; // Return the JWT client
  } catch (error) {
    console.error("Error authorizing with service account:", error);
    throw error;
  }
}
