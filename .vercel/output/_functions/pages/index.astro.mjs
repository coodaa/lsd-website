import { f as createComponent, k as renderHead, h as addAttribute, l as renderComponent, u as unescapeHTML, r as renderTemplate } from '../chunks/astro/server_BK9iavCr.mjs';
import 'piccolore';
import { $ as $$Sidebar } from '../chunks/Sidebar_BZy6CdWp.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const baseUrl = "https://lsd-backend.de/wp-json/wp/v2";
  let pages = [];
  try {
    const res = await fetch(
      `${baseUrl}/pages?per_page=100&orderby=menu_order&order=asc&status=publish`
    );
    if (res.ok) {
      pages = await res.json();
    }
  } catch (err) {
    console.error("❌ Fehler beim Laden der Seiten:", err);
  }
  const firstPage = pages.find((p) => p.parent === 0);
  const childPages = pages.filter((p) => p.parent === firstPage?.id);
  let sortedPages = [...pages.filter((p) => p.parent === 0)];
  const kontaktIndex = sortedPages.findIndex((p) => p.slug === "kontakt");
  if (kontaktIndex > -1) {
    const [kontaktPage] = sortedPages.splice(kontaktIndex, 1);
    sortedPages.push(kontaktPage);
  }
  function getFirstImage(html) {
    const match = html?.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
  }
  return renderTemplate`<html lang="de"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${firstPage?.title?.rendered || "LSD Berlin"}</title>${renderHead()}</head> <body${addAttribute(`slug-${firstPage?.slug || "home"}`, "class")}> <div class="grid-layout"> ${renderComponent($$result, "Sidebar", $$Sidebar, { "pages": sortedPages, "activeSlug": firstPage?.slug })} <main class="content-area"> <div class="content"> <!-- 🔹 Hauptinhalt --> <div>${unescapeHTML(firstPage?.content?.rendered)}</div> <!-- 🔹 Unterseiten mit Bildern --> ${childPages.length > 0 && renderTemplate`<div class="subpages"> ${childPages.map((child) => {
    const img = getFirstImage(child.content.rendered);
    return renderTemplate`<a${addAttribute(`/${child.slug}`, "href")} class="subpage"> ${img && renderTemplate`<img${addAttribute(img, "src")}${addAttribute(child.title.rendered, "alt")}>`} <h2>${unescapeHTML(child.title.rendered)}</h2> </a>`;
  })} </div>`} </div> </main> </div> </body></html>`;
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
