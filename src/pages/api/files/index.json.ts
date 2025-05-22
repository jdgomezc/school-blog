import type { APIRoute } from "astro";

import { FilesController } from "src/controllers";

export const POST: APIRoute = async ({ request }) => {
    return FilesController.uploadFile(request)
}

export const DELETE: APIRoute = async ({ request }) => {
    return FilesController.deleteFile(request)
}