import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_1lKdbJAH.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/announcements.astro.mjs');
const _page2 = () => import('./pages/api/auth/_---all_.astro.mjs');
const _page3 = () => import('./pages/api/files/index.json.astro.mjs');
const _page4 = () => import('./pages/api/posts/filtered.json.astro.mjs');
const _page5 = () => import('./pages/api/posts/index.json.astro.mjs');
const _page6 = () => import('./pages/login.astro.mjs');
const _page7 = () => import('./pages/meetings.astro.mjs');
const _page8 = () => import('./pages/post/edit.astro.mjs');
const _page9 = () => import('./pages/post.astro.mjs');
const _page10 = () => import('./pages/posts.astro.mjs');
const _page11 = () => import('./pages/publish.astro.mjs');
const _page12 = () => import('./pages/schedules.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.8.0_@netlify+blobs@8.2.0_@types+node@22.15.21_jiti@2.4.2_lightningcss@1.30.1_rollup@4.41.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/announcements.astro", _page1],
    ["src/pages/api/auth/[...all].ts", _page2],
    ["src/pages/api/files/index.json.ts", _page3],
    ["src/pages/api/posts/filtered.json.ts", _page4],
    ["src/pages/api/posts/index.json.ts", _page5],
    ["src/pages/login.astro", _page6],
    ["src/pages/meetings.astro", _page7],
    ["src/pages/post/edit.astro", _page8],
    ["src/pages/post/index.astro", _page9],
    ["src/pages/posts.astro", _page10],
    ["src/pages/publish.astro", _page11],
    ["src/pages/schedules.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "a4b51e9d-bc7e-4a55-b315-048d1f781926"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
