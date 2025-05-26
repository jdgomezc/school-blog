import { P as PostsController } from '../../../chunks/posts.controller_BnLdWOrp.mjs';
import 'google-auth-library';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  return PostsController.getPostsFiltered(request);
};
const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
