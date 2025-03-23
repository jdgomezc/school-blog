import { google } from 'googleapis'
import { Readable } from 'stream';

import { authorize } from "@/config";
import { IMG_FOLDER, PDF_FOLDER } from "@/config"

export const ArchivosController = {
  async getFiles() {
      try {
        const authGoogleClient = await authorize()
        const drive = google.drive({ version: 'v3', auth: authGoogleClient })
    
        const files = await drive.files.list({
          q: `'${PDF_FOLDER}' in parents`, 
          fields: 'files(id, name, mimeType)',
          supportsAllDrives: true
        })

        console.log('Files:', files.data)

        return new Response(JSON.stringify(files.data), { status: 200 })
      } catch (error) {
        console.error('Error listing files:', error)
        return new Response(JSON.stringify({ error: 'Error listing files' }), { status: 500 })
      }
  },

  async uploadFile(request: Request) {
    try {
      const binaryData = await request.arrayBuffer();
      const contentType = request.headers.get('content-type');

      const fileName = request.headers.get('x-file-name') || 'unnamed_file';
  
      if (!binaryData || binaryData.byteLength === 0) {
          return new Response(JSON.stringify({ error: "No file data found in request" }), { status: 400 })
      }
  
      const authGoogleClient = await authorize();
      const drive = google.drive({ version: 'v3', auth: authGoogleClient });
  
      const stream = Readable.from(Buffer.from(binaryData));
  
      const requestBody = {
          name: fileName,
          parents: [contentType === 'application/pdf' ? PDF_FOLDER : IMG_FOLDER]
      };
  
      const media = {
          mimeType: contentType,
          body: stream,
      };
  
      const file = await drive.files.create({
          requestBody,
          media: media,
          fields: 'id',
          supportsAllDrives: true,
      });
  
      const fileId = file.data.id;
  
      await drive.permissions.create({
          fileId: fileId,
          requestBody: {
              role: 'reader',
              type: 'anyone'
          }
      });
      
      const getResponse = await drive.files.get({
          fileId: fileId,
          fields: 'webViewLink,webContentLink'
      });
      
      const webViewLink = getResponse.data.webViewLink;
      const webContentLink = getResponse.data.webContentLink;

      return new Response(JSON.stringify({
          message: 'File uploaded successfully',
          fileId: fileId,
          shareableLink: webViewLink,
          downloadLink: webContentLink
      }), { status: 200 });
    } catch (error) {
      console.error('Error uploading file:', error)
      return new Response(JSON.stringify({ error: "There was an error while doing" }), { status: 500 })
    }
  },
}