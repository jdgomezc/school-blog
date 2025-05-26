import '../../../chunks/index_DdoYMPJN.mjs';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { P as PDF_FOLDER, I as IMG_FOLDER } from '../../../chunks/client_550KDs2Y.mjs';
import { JWT } from 'google-auth-library';
export { renderers } from '../../../renderers.mjs';

const SCOPES = ["https://www.googleapis.com/auth/drive"];
async function authorize() {
  try {
    const authGoogleClient = new JWT({
      // Use JWT directly
      keyFile: "./service_account.json",
      scopes: SCOPES
    });
    await authGoogleClient.authorize();
    return authGoogleClient;
  } catch (error) {
    console.error("Error authorizing with service account:", error);
    throw error;
  }
}

const FilesController = {
  async getFiles() {
    try {
      const authGoogleClient = await authorize();
      const drive = google.drive({ version: "v3", auth: authGoogleClient });
      const files = await drive.files.list({
        q: `'${PDF_FOLDER}' in parents`,
        fields: "files(id, name, mimeType)",
        supportsAllDrives: true
      });
      return new Response(JSON.stringify(files.data), { status: 200 });
    } catch (error) {
      console.error("Error listing files:", error);
      return new Response(JSON.stringify({ error: "Error listing files" }), { status: 500 });
    }
  },
  async uploadFile(request) {
    try {
      const binaryData = await request.arrayBuffer();
      const contentType = request.headers.get("content-type");
      const fileName = request.headers.get("x-file-name") || "unnamed_file";
      if (!binaryData || binaryData.byteLength === 0) {
        return new Response(JSON.stringify({ error: "No file data found in request" }), { status: 400 });
      }
      const authGoogleClient = await authorize();
      const drive = google.drive({ version: "v3", auth: authGoogleClient });
      const stream = Readable.from(Buffer.from(binaryData));
      const requestBody = {
        name: fileName,
        parents: [contentType === "application/pdf" ? PDF_FOLDER : IMG_FOLDER]
      };
      const media = {
        mimeType: contentType,
        body: stream
      };
      const file = await drive.files.create({
        requestBody,
        media,
        fields: "id",
        supportsAllDrives: true
      });
      const fileId = file.data.id;
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone"
        }
      });
      const getResponse = await drive.files.get({
        fileId,
        fields: "webViewLink,webContentLink"
      });
      const webViewLink = getResponse.data.webViewLink;
      const webContentLink = getResponse.data.webContentLink;
      return new Response(JSON.stringify({
        message: "File uploaded successfully",
        fileId,
        shareableLink: webViewLink,
        downloadLink: webContentLink
      }), { status: 200 });
    } catch (error) {
      console.error("Error uploading file:", error);
      return new Response(JSON.stringify({ error: "There was an error while doing" }), { status: 500 });
    }
  }
};

const POST = async ({ request }) => {
  return FilesController.uploadFile(request);
};
const DELETE = async ({ request }) => {
  return FilesController.deleteFile(request);
};
const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
