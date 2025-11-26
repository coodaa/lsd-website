import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, n as renderSlot, r as renderTemplate, m as maybeRenderHead, o as renderScript, k as renderComponent, p as Fragment } from './astro/server_Di-6DRhC.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro$2 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "LSD Berlin \u2013 K\xFCnstlerkollektiv f\xFCr experimentelle Theater- und Performancearbeit",
    description = "LSD Berlin ist ein K\xFCnstlerkollektiv ...",
    image = "/og-default.jpg",
    url = "https://www.lsd-berlin.de"
  } = Astro2.props;
  return renderTemplate`<html lang="de"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><!-- SEO --><meta name="description"${addAttribute(description, "content")}><meta name="robots" content="index, follow"><link rel="canonical"${addAttribute(url, "href")}><!-- Open Graph --><meta property="og:locale" content="de_DE"><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(`${url}${image}`, "content")}><meta property="og:url"${addAttribute(url, "content")}><meta property="og:site_name" content="LSD Berlin"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(`${url}${image}`, "content")}><!-- Icons --><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">${renderHead()}</head> <body> <!-- Seite (Sidebar + Content) --> ${renderSlot($$result, $$slots["default"])} <!-- Footer separat unten --> ${renderSlot($$result, $$slots["footer"])} </body></html>`;
}, "/Users/florianschneider/code/coodaa/lsd-website/src/layouts/BaseLayout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { pages = [], activeSlug, footerPages = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="sidebar"> <!-- Mobile Menu Toggle --> <button class="menu-toggle" id="menuToggle"> <span class="menu-text">Menü</span> <span class="menu-close">X</span> </button> <!-- Hauptmenü --> <ul id="menuList"> ${pages.map((p) => renderTemplate`<li${addAttribute(p.slug === activeSlug ? "active" : "", "class")}> <a${addAttribute(`/${p.slug}`, "href")}>${p.title?.rendered}</a> </li>`)} <!-- Mobile Footer links: nur im offenen Menü sichtbar --> <li class="mobile-footer-links"> ${footerPages.map((p, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a class="footer-link"${addAttribute(`/${p.slug}`, "href")}> ${p.title.rendered} </a> ${i < footerPages.length - 1 && renderTemplate`<span class="dot">·</span>`}` })}`)} </li> </ul> </aside> ${renderScript($$result, "/Users/florianschneider/code/coodaa/lsd-website/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/florianschneider/code/coodaa/lsd-website/src/components/Sidebar.astro", void 0);

// HTML-Entities decodieren + Bildlinks bereinigen

function fix(str = "") {
  if (!str) return "";

  let s = String(str);

  const entityMap = {
    "&auml;": "ä",
    "&ouml;": "ö",
    "&uuml;": "ü",
    "&Auml;": "Ä",
    "&Ouml;": "Ö",
    "&Uuml;": "Ü",
    "&szlig;": "ß",
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
  };

  s = s.replace(
    /&(auml|ouml|uuml|Auml|Ouml|Uuml|szlig|quot|amp|lt|gt|nbsp);/g,
    (match) => entityMap[match] ?? match
  );

  // numerische Entities (dezimal)
  s = s.replace(/&#(\d+);/g, (_, dec) =>
    String.fromCharCode(parseInt(dec, 10))
  );

  // numerische Entities (hex)
  s = s.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  // WP umschließt Bilder oft mit <a>...</a> → entfernen
  s = s.replace(/<a[^>]*>\s*(<img[^>]+>)\s*<\/a>/gi, "$1");

  return s;
}

function getFirstImage(html = "") {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : null;
}

const $$Astro = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const { footerPages = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="desktop-footer"> ${footerPages.map((p, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(`/${p.slug}`, "href")}>${fix(p.title?.rendered || "")}</a> ${i < footerPages.length - 1 && renderTemplate`<span class="dot">·</span>`}` })}`)} </footer>`;
}, "/Users/florianschneider/code/coodaa/lsd-website/src/components/Footer.astro", void 0);

export { $$BaseLayout as $, $$Footer as a, $$Sidebar as b, fix as f, getFirstImage as g };
