import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, h as addAttribute } from '../chunks/astro/server_Di-6DRhC.mjs';
import 'piccolore';
import { f as fix, $ as $$BaseLayout, a as $$Footer, b as $$Sidebar, g as getFirstImage } from '../chunks/Footer_Brj0C3yC.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const baseUrl = "https://lsd-backend.de/wp-json/wp/v2";
  const slug = Astro2.params.slug;
  const res = await fetch(`${baseUrl}/pages?slug=${slug}`);
  const data = await res.json();
  const page = data[0] ?? null;
  const allRes = await fetch(
    `${baseUrl}/pages?per_page=100&orderby=menu_order&order=asc&status=publish`
  );
  const pages = await allRes.json();
  const mainPages = pages.filter((p) => p.parent === 0);
  let sortedMainPages = mainPages.filter((p) => {
    const t = p.title?.rendered?.toLowerCase() || "";
    return !t.includes("impressum") && !t.includes("datenschutz");
  });
  const kontaktIndex = sortedMainPages.findIndex((p) => p.slug === "kontakt");
  if (kontaktIndex > -1) {
    const [kontakt] = sortedMainPages.splice(kontaktIndex, 1);
    sortedMainPages.push(kontakt);
  }
  const parent = page ? pages.find((p) => p.id === page.parent) : null;
  const children = page ? pages.filter((p) => p.parent === page.id) : [];
  const footerPages = pages.filter((p) => {
    const t = p.title?.rendered?.toLowerCase() || "";
    return t.includes("impressum") || t.includes("datenschutz");
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": fix(page?.title?.rendered || "LSD Berlin") }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid-layout"> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "pages": sortedMainPages, "activeSlug": slug, "footerPages": footerPages })} <main class="content-area"> <div class="content"> <!-- DETAIL WRAPPER: macht X bündig mit dem Bild --> <div class="detail-wrapper"> ${page ? renderTemplate`<div class="detail-content">${unescapeHTML(fix(page.content?.rendered || ""))}</div>` : renderTemplate`<p>(Seite nicht gefunden)</p>`} ${parent && renderTemplate`<a${addAttribute(`/${parent.slug}`, "href")} class="detail-close">
×
</a>`} </div> <!-- UNTERSEITEN --> ${children.length > 0 && renderTemplate`<div class="subpages"> ${children.map((c) => {
    const img = getFirstImage(c.content?.rendered || "");
    return renderTemplate`<a${addAttribute(`/${c.slug}`, "href")} class="subpage"> ${img && renderTemplate`<img${addAttribute(img, "src")}${addAttribute(fix(c.title?.rendered || ""), "alt")}>`} </a>`;
  })} </div>`} </div> </main> </div>  `, "footer": async ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "footerPages": footerPages })}` })}`;
}, "/Users/florianschneider/code/coodaa/lsd-website/src/pages/[slug].astro", void 0);
const $$file = "/Users/florianschneider/code/coodaa/lsd-website/src/pages/[slug].astro";
const $$url = "/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
