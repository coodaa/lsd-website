import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, l as renderComponent, u as unescapeHTML, r as renderTemplate } from '../chunks/astro/server_BDyE-jdM.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_BmsS1ejY.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const baseUrl = "https://lsd-backend.de/wp-json/wp/v2";
  const slug = Astro2.params.slug;
  const pageRes = await fetch(`${baseUrl}/pages?slug=${slug}`);
  const pageData = await pageRes.json();
  const page = pageData[0];
  const allPagesRes = await fetch(
    `${baseUrl}/pages?per_page=100&orderby=menu_order&order=asc&status=publish`
  );
  const pages = await allPagesRes.json();
  const mainPages = pages.filter((p) => p.parent === 0);
  const childPages = pages.filter((p) => p.parent === page?.id);
  const parentPage = pages.find((p) => p.id === page?.parent);
  let sortedPages = [...mainPages];
  const kontaktIndex = sortedPages.findIndex((p) => p.slug === "kontakt");
  if (kontaktIndex > -1) {
    const [kontaktPage] = sortedPages.splice(kontaktIndex, 1);
    sortedPages.push(kontaktPage);
  }
  function getFirstImage(html) {
    const match = html?.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
  }
  return renderTemplate`<html lang="de"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${page?.title?.rendered || "LSD Berlin"}</title>${renderHead()}</head> <body${addAttribute(`slug-${slug}`, "class")}> <div class="grid-layout"> ${renderComponent($$result, "Sidebar", $$Sidebar, { "pages": sortedPages, "activeSlug": slug })} <main class="content-area"> <div class="content"> ${parentPage && renderTemplate`<a${addAttribute(`/${parentPage.slug}`, "href")} class="close-btn">×</a>`} <div>${unescapeHTML(page?.content?.rendered)}</div> ${childPages.length > 0 && renderTemplate`<div class="subpages"> ${childPages.map((child) => {
    const img = getFirstImage(child.content.rendered);
    return renderTemplate`<a${addAttribute(`/${child.slug}`, "href")} class="subpage"> ${img && renderTemplate`<img${addAttribute(img, "src")}${addAttribute(child.title.rendered, "alt")}>`} </a>`;
  })} </div>`} </div> </main> </div> </body></html>`;
}, "/Users/florianschneider/code/coodaa/lsd-website/src/pages/[slug].astro", void 0);
const $$file = "/Users/florianschneider/code/coodaa/lsd-website/src/pages/[slug].astro";
const $$url = "/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
