import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, h as addAttribute } from '../chunks/astro/server_Di-6DRhC.mjs';
import 'piccolore';
import { f as fix, $ as $$BaseLayout, a as $$Footer, b as $$Sidebar, g as getFirstImage } from '../chunks/Footer_Brj0C3yC.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const baseUrl = "https://lsd-backend.de/wp-json/wp/v2";
  const res = await fetch(
    `${baseUrl}/pages?per_page=100&orderby=menu_order&order=asc&status=publish`
  );
  const pages = await res.json();
  const mainPages = pages.filter((p) => p.parent === 0);
  const home = mainPages[0] ?? pages[0];
  const children = pages.filter((p) => p.parent === home?.id);
  let sortedMainPages = mainPages.filter((p) => {
    const t = p.title?.rendered?.toLowerCase() || "";
    return !t.includes("impressum") && !t.includes("datenschutz");
  });
  const kontaktIndex = sortedMainPages.findIndex((p) => p.slug === "kontakt");
  if (kontaktIndex > -1) {
    const [kontakt] = sortedMainPages.splice(kontaktIndex, 1);
    sortedMainPages.push(kontakt);
  }
  const footerPages = pages.filter((p) => {
    const t = p.title?.rendered?.toLowerCase() || "";
    return t.includes("impressum") || t.includes("datenschutz");
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": fix(home?.title?.rendered || "LSD Berlin") }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid-layout"> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "pages": sortedMainPages, "activeSlug": home?.slug, "footerPages": footerPages })} <main class="content-area"> <div class="content"> <div>${unescapeHTML(fix(home?.content?.rendered || ""))}</div> ${children.length > 0 && renderTemplate`<div class="subpages"> ${children.map((c) => {
    const img = getFirstImage(c.content?.rendered || "");
    return renderTemplate`<a${addAttribute(`/${c.slug}`, "href")} class="subpage"> ${img && renderTemplate`<img${addAttribute(img, "src")}${addAttribute(fix(c.title?.rendered || ""), "alt")}>`} <h2>${unescapeHTML(fix(c.title?.rendered || ""))}</h2> </a>`;
  })} </div>`} </div> </main> </div>  `, "footer": async ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "footerPages": footerPages })}` })}`;
}, "/Users/florianschneider/code/coodaa/lsd-website/src/pages/index.astro", void 0);
const $$file = "/Users/florianschneider/code/coodaa/lsd-website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
