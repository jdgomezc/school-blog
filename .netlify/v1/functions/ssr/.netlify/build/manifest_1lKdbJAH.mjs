import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { v as NOOP_MIDDLEWARE_HEADER, w as decodeKey } from './chunks/astro/server_DLxTQpo-.mjs';
import 'clsx';
import 'cookie';
import './chunks/shared_9gEenf6c.mjs';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jdgomez/UVG/extension_hours/school-blog/","cacheDir":"file:///Users/jdgomez/UVG/extension_hours/school-blog/node_modules/.astro/","outDir":"file:///Users/jdgomez/UVG/extension_hours/school-blog/dist/","srcDir":"file:///Users/jdgomez/UVG/extension_hours/school-blog/src/","publicDir":"file:///Users/jdgomez/UVG/extension_hours/school-blog/public/","buildClientDir":"file:///Users/jdgomez/UVG/extension_hours/school-blog/dist/","buildServerDir":"file:///Users/jdgomez/UVG/extension_hours/school-blog/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"post/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post","isIndex":true,"type":"page","pattern":"^\\/post\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/index.astro","pathname":"/post","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts","isIndex":false,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts.astro","pathname":"/posts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"publish/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/publish","isIndex":false,"type":"page","pattern":"^\\/publish\\/?$","segments":[[{"content":"publish","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/publish.astro","pathname":"/publish","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"schedules/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/schedules","isIndex":false,"type":"page","pattern":"^\\/schedules\\/?$","segments":[[{"content":"schedules","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/schedules.astro","pathname":"/schedules","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.8.0_@netlify+blobs@8.2.0_@types+node@22.15.21_jiti@2.4.2_lightningcss@1.30.1_rollup@4.41.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/announcements.BrX8y0hN.css"}],"routeData":{"route":"/announcements","isIndex":false,"type":"page","pattern":"^\\/announcements\\/?$","segments":[[{"content":"announcements","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/announcements.astro","pathname":"/announcements","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/files/index.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/files\\/index\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"files","dynamic":false,"spread":false}],[{"content":"index.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/files/index.json.ts","pathname":"/api/files/index.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/posts/filtered.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/posts\\/filtered\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"filtered.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/posts/filtered.json.ts","pathname":"/api/posts/filtered.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/posts/index.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/posts\\/index\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"index.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/posts/index.json.ts","pathname":"/api/posts/index.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/announcements.BrX8y0hN.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/announcements.BrX8y0hN.css"}],"routeData":{"route":"/meetings","isIndex":false,"type":"page","pattern":"^\\/meetings\\/?$","segments":[[{"content":"meetings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/meetings.astro","pathname":"/meetings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/announcements.BrX8y0hN.css"}],"routeData":{"route":"/post/edit","isIndex":false,"type":"page","pattern":"^\\/post\\/edit\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/edit.astro","pathname":"/post/edit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/announcements.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/meetings.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/post/edit.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/post/index.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/posts.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/publish.astro",{"propagation":"none","containsHead":true}],["/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/schedules.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.8.0_@netlify+blobs@8.2.0_@types+node@22.15.21_jiti@2.4.2_lightningcss@1.30.1_rollup@4.41.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/announcements@_@astro":"pages/announcements.astro.mjs","\u0000@astro-page:src/pages/api/auth/[...all]@_@ts":"pages/api/auth/_---all_.astro.mjs","\u0000@astro-page:src/pages/api/files/index.json@_@ts":"pages/api/files/index.json.astro.mjs","\u0000@astro-page:src/pages/api/posts/filtered.json@_@ts":"pages/api/posts/filtered.json.astro.mjs","\u0000@astro-page:src/pages/api/posts/index.json@_@ts":"pages/api/posts/index.json.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/meetings@_@astro":"pages/meetings.astro.mjs","\u0000@astro-page:src/pages/post/edit@_@astro":"pages/post/edit.astro.mjs","\u0000@astro-page:src/pages/post/index@_@astro":"pages/post.astro.mjs","\u0000@astro-page:src/pages/posts@_@astro":"pages/posts.astro.mjs","\u0000@astro-page:src/pages/publish@_@astro":"pages/publish.astro.mjs","\u0000@astro-page:src/pages/schedules@_@astro":"pages/schedules.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_1lKdbJAH.mjs","/Users/jdgomez/UVG/extension_hours/school-blog/node_modules/.pnpm/unstorage@1.16.0_@netlify+blobs@8.2.0/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/jdgomez/UVG/extension_hours/school-blog/node_modules/.pnpm/astro@5.8.0_@netlify+blobs@8.2.0_@types+node@22.15.21_jiti@2.4.2_lightningcss@1.30.1_rollup@4.41.1_typescript@5.8.3/node_modules/astro/dist/assets/services/noop.js":"chunks/noop_DPmY70Me.mjs","@/components/posts":"_astro/posts.BjvqISjL.js","@/components/login":"_astro/login.BL878iQ3.js","/Users/jdgomez/UVG/extension_hours/school-blog/src/components/Edit":"_astro/Edit.D3v8HHGV.js","@/components/post":"_astro/post.jCVXnSA3.js","@/components/publish":"_astro/publish.Wswco28p.js","@/components/ImagesCarousel":"_astro/ImagesCarousel.c0j7Xy82.js","@/components/ui/sonner":"_astro/sonner.8xvTx1fO.js","/Users/jdgomez/UVG/extension_hours/school-blog/src/components/Lougout":"_astro/Lougout.BjL79tzJ.js","@astrojs/react/client.js":"_astro/client.DHXzozRT.js","/Users/jdgomez/UVG/extension_hours/school-blog/node_modules/.pnpm/astro@5.8.0_@netlify+blobs@8.2.0_@types+node@22.15.21_jiti@2.4.2_lightningcss@1.30.1_rollup@4.41.1_typescript@5.8.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/logo.DJtoGnPr.png","/_astro/school_8.nJAkVVgr.jpeg","/_astro/school_1.CyoFgwxg.jpeg","/_astro/school_3.BS_t8RhL.jpeg","/_astro/school_5.BGv9xuhp.jpeg","/_astro/school_2.xEZuIZSZ.jpeg","/_astro/school_6.DWPOnyvY.jpeg","/_astro/school_4.BfUMLy8s.jpeg","/_astro/school_9.CBuyQDjX.jpeg","/_astro/school_10.CfiLaMqo.jpeg","/_astro/school_7.-Gx43rC-.jpeg","/_astro/announcements.BrX8y0hN.css","/favicon.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/Edit.D3v8HHGV.js","/_astro/ImagesCarousel.c0j7Xy82.js","/_astro/Lougout.BjL79tzJ.js","/_astro/auth-client.Dx2iPTvy.js","/_astro/button.CGCe6qMn.js","/_astro/card.D-GnspA0.js","/_astro/chevron-left.BV1lcprZ.js","/_astro/client.DHXzozRT.js","/_astro/client.NQJAYU1F.js","/_astro/index.CkAj76cr.js","/_astro/index.CqJmc5Mb.js","/_astro/index.DN5WaTab.js","/_astro/index.Dk6mg5v6.js","/_astro/input.CDisLtW4.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/loader-circle.COpW3wl6.js","/_astro/login.BL878iQ3.js","/_astro/post.jCVXnSA3.js","/_astro/posts.BjvqISjL.js","/_astro/publish.Wswco28p.js","/_astro/sonner.8xvTx1fO.js","/_astro/textarea.CbuZyb_m.js","/_astro/utils.y9b8gBZq.js","/post/index.html","/posts/index.html","/publish/index.html","/schedules/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"dD2HYM8rOHM9zp2KFy4UGE8ceqFUy7TozQsuB1l6Yag=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/jdgomez/UVG/extension_hours/school-blog/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
