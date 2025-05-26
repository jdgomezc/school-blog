import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DLxTQpo-.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BpJ0huSf.mjs';
import { P as Posts } from '../chunks/posts_v2Xv_DKN.mjs';
export { renderers } from '../renderers.mjs';

const $$Announcements = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`export const prerender = false;
${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Posts", Posts, { "type": "ANNOUNCEMENT", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/posts", "client:component-export": "default" })}` })}`;
}, "/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/announcements.astro", void 0);

const $$file = "/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/announcements.astro";
const $$url = "/announcements";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Announcements,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
