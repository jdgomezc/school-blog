import { JWT } from 'google-auth-library'

const SCOPES = ['https://www.googleapis.com/auth/drive']

export async function authorize() {

  try {
    const authGoogleClient = new JWT({ // Use JWT directly
      keyFile: "./service_account.json",
      scopes: SCOPES,
    });

    await authGoogleClient.authorize(); // Authorize the client
    return authGoogleClient; // Return the JWT client
  } catch (error) {
    console.error('Error authorizing with service account:', error)
    throw error
  }
}
