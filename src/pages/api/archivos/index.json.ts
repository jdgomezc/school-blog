import type { APIRoute } from "astro";

import { ArchivosController } from "src/controllers";

export const GET: APIRoute = async () => {
    return ArchivosController.getFiles()
}

export const POST: APIRoute = async ({ request }) => {
    return ArchivosController.uploadFile(request)
}