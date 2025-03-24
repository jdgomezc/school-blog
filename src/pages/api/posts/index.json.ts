import type { APIRoute } from "astro";

import { PostsController } from "src/controllers";

export const GET: APIRoute = async () => {
    return PostsController.getPosts()
}

export const POST: APIRoute = async ({ request }) => {
    return PostsController.addPost(request)
}