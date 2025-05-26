import type { APIRoute } from "astro";

import { PostsController } from "src/controllers";

export const GET: APIRoute = async () => {
  return PostsController.getPosts();
};

export const POST: APIRoute = async ({ request }) => {
  return PostsController.addPost(request);
};

export const PUT: APIRoute = async ({ request }) => {
  return PostsController.editPost(request);
};

export const DELETE: APIRoute = async ({ request }) => {
  return PostsController.deletePost(request);
};

export const prerender = false;
