import type { APIRoute } from "astro";

import { PostsController } from "src/controllers";

export const GET: APIRoute = async ({ request }) => {
    return PostsController.getPostsFiltered(request)
}