import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_Di-6DRhC.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CTohNOYF.mjs';
import 'es-module-lexer';

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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/florianschneider/code/coodaa/lsd-website/","cacheDir":"file:///Users/florianschneider/code/coodaa/lsd-website/node_modules/.astro/","outDir":"file:///Users/florianschneider/code/coodaa/lsd-website/dist/","srcDir":"file:///Users/florianschneider/code/coodaa/lsd-website/src/","publicDir":"file:///Users/florianschneider/code/coodaa/lsd-website/public/","buildClientDir":"file:///Users/florianschneider/code/coodaa/lsd-website/dist/client/","buildServerDir":"file:///Users/florianschneider/code/coodaa/lsd-website/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-Regular.woff2) format(\"woff2\"),url(/fonts/CourierPrime-Regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-Italic.woff2) format(\"woff2\"),url(/fonts/CourierPrime-Italic.woff) format(\"woff\");font-weight:400;font-style:italic;font-display:swap}@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-Bold.woff2) format(\"woff2\"),url(/fonts/CourierPrime-Bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-BoldItalic.woff2) format(\"woff2\"),url(/fonts/CourierPrime-BoldItalic.woff) format(\"woff\");font-weight:700;font-style:italic;font-display:swap}html,body{margin:0;padding:0;min-height:100%;background:#fff;color:#000;font-family:Courier Prime,monospace;font-size:clamp(16px,1.8vw,24px);line-height:1.45}body{display:flex;flex-direction:column}a{color:inherit;text-decoration:none}ul,li{margin:0;padding:0;list-style:none}.grid-layout{display:flex;flex-direction:column;gap:1.2rem}.sidebar{width:100%;font-size:clamp(16px,1.4vw,22px)}#menuList li{margin:.4rem 0}#menuList li.active>a{text-decoration:underline}.content-area{width:100%}.content{width:92%;margin:0 auto;text-align:left}.content img{width:100%;max-width:420px;height:auto;display:block;margin:1.5rem auto}.subpages{display:grid;gap:1.2rem;margin-top:2rem}.subpages img{width:100%;max-width:420px;display:block;margin:0 auto}.page-header,.page-meta{display:none}.detail-wrapper{position:relative;width:100%}.detail-close{position:absolute;top:0;right:-40px;font-family:Courier Prime,monospace!important;font-weight:400;font-size:clamp(22px,2.5vw,32px);cursor:pointer;line-height:1}.menu-toggle{display:block;background:none;border:none;cursor:pointer;padding:.2rem .5rem;position:fixed;top:.8rem;right:.8rem;z-index:3000}.menu-text,.menu-close{position:absolute;width:100%;right:0;padding-right:9vw;text-align:right;font-family:Courier Prime,monospace!important;font-weight:400;font-size:clamp(18px,5vw,28px);transition:opacity .2s ease}#menuList{display:none;position:fixed;inset:0;background:#fff;padding:5rem 2rem 3rem;overflow-y:auto;z-index:2000}#menuList.open{display:flex;flex-direction:column;gap:.5rem}.mobile-footer-links{display:none;position:fixed;bottom:5rem;right:2rem;text-align:right;font-family:Courier Prime,monospace;font-size:clamp(14px,1.6vw,18px);z-index:2500}#menuList.open .mobile-footer-links{display:block}.mobile-footer-links a{margin:0 .35rem}.mobile-footer-links .dot{margin:0 .2rem}@media(min-width:1201px){.grid-layout{display:grid;grid-template-columns:300px minmax(0,1fr);max-width:1600px;margin:0 auto;padding:3rem 0;column-gap:220px}.sidebar{width:300px;position:fixed;top:4rem;left:calc(50% - 420px)}.content-area{grid-column:2;max-width:1000px}.content{width:auto}.content img,.subpages img{width:360px;max-width:360px;margin-left:0!important;margin-right:0!important}.menu-toggle{display:none!important}#menuList{position:static;display:block;padding:0}.mobile-footer-links{display:none!important}}@media(max-width:1200px){.desktop-footer{display:none!important}}@media(min-width:1400px){.detail-close{right:-60px}}.desktop-footer{margin-top:auto;padding:4rem 0;padding-left:calc(50% - 420px);font-size:clamp(16px,1.4vw,22px)}.desktop-footer .dot{margin:0 .4rem}.menu-toggle{display:block;background:none;border:none;cursor:pointer;padding:.2rem .5rem;top:.8rem;right:.8rem;z-index:3000;width:70px;height:40px;text-align:right;position:fixed}.menu-text,.menu-close{position:absolute;top:50%;right:0;transform:translateY(-50%);width:100%;text-align:right;padding-right:0;font-family:Courier Prime,monospace;font-size:clamp(18px,5vw,28px);transition:opacity .2s ease}.menu-close,.menu-toggle.open .menu-text{opacity:0}.menu-toggle.open .menu-close{opacity:1}\n"}],"routeData":{"route":"/[slug]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-Regular.woff2) format(\"woff2\"),url(/fonts/CourierPrime-Regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-Italic.woff2) format(\"woff2\"),url(/fonts/CourierPrime-Italic.woff) format(\"woff\");font-weight:400;font-style:italic;font-display:swap}@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-Bold.woff2) format(\"woff2\"),url(/fonts/CourierPrime-Bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}@font-face{font-family:Courier Prime;src:url(/fonts/CourierPrime-BoldItalic.woff2) format(\"woff2\"),url(/fonts/CourierPrime-BoldItalic.woff) format(\"woff\");font-weight:700;font-style:italic;font-display:swap}html,body{margin:0;padding:0;min-height:100%;background:#fff;color:#000;font-family:Courier Prime,monospace;font-size:clamp(16px,1.8vw,24px);line-height:1.45}body{display:flex;flex-direction:column}a{color:inherit;text-decoration:none}ul,li{margin:0;padding:0;list-style:none}.grid-layout{display:flex;flex-direction:column;gap:1.2rem}.sidebar{width:100%;font-size:clamp(16px,1.4vw,22px)}#menuList li{margin:.4rem 0}#menuList li.active>a{text-decoration:underline}.content-area{width:100%}.content{width:92%;margin:0 auto;text-align:left}.content img{width:100%;max-width:420px;height:auto;display:block;margin:1.5rem auto}.subpages{display:grid;gap:1.2rem;margin-top:2rem}.subpages img{width:100%;max-width:420px;display:block;margin:0 auto}.page-header,.page-meta{display:none}.detail-wrapper{position:relative;width:100%}.detail-close{position:absolute;top:0;right:-40px;font-family:Courier Prime,monospace!important;font-weight:400;font-size:clamp(22px,2.5vw,32px);cursor:pointer;line-height:1}.menu-toggle{display:block;background:none;border:none;cursor:pointer;padding:.2rem .5rem;position:fixed;top:.8rem;right:.8rem;z-index:3000}.menu-text,.menu-close{position:absolute;width:100%;right:0;padding-right:9vw;text-align:right;font-family:Courier Prime,monospace!important;font-weight:400;font-size:clamp(18px,5vw,28px);transition:opacity .2s ease}#menuList{display:none;position:fixed;inset:0;background:#fff;padding:5rem 2rem 3rem;overflow-y:auto;z-index:2000}#menuList.open{display:flex;flex-direction:column;gap:.5rem}.mobile-footer-links{display:none;position:fixed;bottom:5rem;right:2rem;text-align:right;font-family:Courier Prime,monospace;font-size:clamp(14px,1.6vw,18px);z-index:2500}#menuList.open .mobile-footer-links{display:block}.mobile-footer-links a{margin:0 .35rem}.mobile-footer-links .dot{margin:0 .2rem}@media(min-width:1201px){.grid-layout{display:grid;grid-template-columns:300px minmax(0,1fr);max-width:1600px;margin:0 auto;padding:3rem 0;column-gap:220px}.sidebar{width:300px;position:fixed;top:4rem;left:calc(50% - 420px)}.content-area{grid-column:2;max-width:1000px}.content{width:auto}.content img,.subpages img{width:360px;max-width:360px;margin-left:0!important;margin-right:0!important}.menu-toggle{display:none!important}#menuList{position:static;display:block;padding:0}.mobile-footer-links{display:none!important}}@media(max-width:1200px){.desktop-footer{display:none!important}}@media(min-width:1400px){.detail-close{right:-60px}}.desktop-footer{margin-top:auto;padding:4rem 0;padding-left:calc(50% - 420px);font-size:clamp(16px,1.4vw,22px)}.desktop-footer .dot{margin:0 .4rem}.menu-toggle{display:block;background:none;border:none;cursor:pointer;padding:.2rem .5rem;top:.8rem;right:.8rem;z-index:3000;width:70px;height:40px;text-align:right;position:fixed}.menu-text,.menu-close{position:absolute;top:50%;right:0;transform:translateY(-50%);width:100%;text-align:right;padding-right:0;font-family:Courier Prime,monospace;font-size:clamp(18px,5vw,28px);transition:opacity .2s ease}.menu-close,.menu-toggle.open .menu-text{opacity:0}.menu-toggle.open .menu-close{opacity:1}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/florianschneider/code/coodaa/lsd-website/src/pages/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/florianschneider/code/coodaa/lsd-website/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/[slug]@_@astro":"pages/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CAS__m-v.mjs","/Users/florianschneider/code/coodaa/lsd-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Dy9uOU6X.mjs","/Users/florianschneider/code/coodaa/lsd-website/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts":"_astro/Sidebar.astro_astro_type_script_index_0_lang.yW1K0qhj.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/florianschneider/code/coodaa/lsd-website/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"menuToggle\"),t=document.getElementById(\"menuList\");function n(){document.documentElement.style.overflow=\"hidden\",document.body.style.overflow=\"hidden\",document.body.style.position=\"fixed\",document.body.style.width=\"100%\"}function l(){document.documentElement.style.overflow=\"\",document.body.style.overflow=\"\",document.body.style.position=\"\",document.body.style.width=\"\"}e?.addEventListener(\"click\",()=>{const o=t.classList.toggle(\"open\");e.classList.toggle(\"open\"),o?n():l()});"]],"assets":["/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/og-default.jpg","/fonts/CourierPrime-Bold.ttf","/fonts/CourierPrime-Bold.woff","/fonts/CourierPrime-Bold.woff2","/fonts/CourierPrime-BoldItalic.ttf","/fonts/CourierPrime-BoldItalic.woff","/fonts/CourierPrime-BoldItalic.woff2","/fonts/CourierPrime-Italic.ttf","/fonts/CourierPrime-Italic.woff","/fonts/CourierPrime-Italic.woff2","/fonts/CourierPrime-Regular.ttf","/fonts/CourierPrime-Regular.woff","/fonts/CourierPrime-Regular.woff2"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"XYlF0tGomRZZ3ZBnMw3OYGPhySNDc5GNpVuJYD+2/+I="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
