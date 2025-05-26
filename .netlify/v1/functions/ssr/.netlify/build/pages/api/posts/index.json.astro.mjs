import { P as PostsController } from '../../../chunks/posts.controller_BnLdWOrp.mjs';
import 'google-auth-library';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  return PostsController.getPosts();
};
const POST = async ({ request }) => {
  return PostsController.addPost(request);
};
const PUT = async ({ request }) => {
  return PostsController.editPost(request);
};
const DELETE = async ({ request }) => {
  return PostsController.deletePost(request);
};
const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
