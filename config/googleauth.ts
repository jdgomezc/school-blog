import { JWT } from 'google-auth-library'

const SCOPES = ['https://www.googleapis.com/auth/drive']

export async function authorize() {

  try {
    const authClient = new JWT({ // Use JWT directly
      keyFile: "./service_account.json",
      scopes: SCOPES,
    });

    await authClient.authorize(); // Authorize the client
    return authClient; // Return the JWT client
  } catch (error) {
    console.error('Error authorizing with service account:', error)
    throw error
  }
}
