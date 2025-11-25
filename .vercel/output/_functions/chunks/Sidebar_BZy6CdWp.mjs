import { e as createAstro, f as createComponent, m as maybeRenderHead, n as renderScript, h as addAttribute, r as renderTemplate, l as renderComponent, o as Fragment } from './astro/server_BK9iavCr.mjs';
import 'piccolore';
/* empty css                          */

const $$Astro = createAstro("https://www.lsd-berlin.de");
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { pages = [], activeSlug } = Astro2.props;
  let filteredPages = pages.filter((p) => p.parent === 0).sort((a, b) => {
    const orderA = a.menu_order ?? 0;
    const orderB = b.menu_order ?? 0;
    return orderA - orderB;
  });
  const footerPages = filteredPages.filter(
    (p) => p.title.rendered.toLowerCase().includes("impressum") || p.title.rendered.toLowerCase().includes("datenschutz")
  );
  filteredPages = filteredPages.filter((p) => !footerPages.includes(p));
  return renderTemplate`${maybeRenderHead()}<aside class="sidebar"> <!-- 🔘 Mobile Menü Button --> <button class="menu-toggle" id="menuToggle" aria-label="Menü öffnen"> <span class="menu-label"> <span class="menu-text">Menü</span> <span class="menu-close">X</span> </span> </button> <!-- 🔗 Hauptmenü --> <ul id="menuList"> ${filteredPages.map((p) => renderTemplate`<li${addAttribute(p.slug === activeSlug ? "active" : "", "class")}> <a${addAttribute(`/${p.slug}`, "href")}${addAttribute(p.slug === activeSlug ? "active" : "", "class")}> ${p.title.rendered} </a> </li>`)} <!-- 📱 Mobile Footer --> <div class="mobile-footer"> ${footerPages.map((p, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(`/${p.slug}`, "href")}>${p.title.rendered}</a> ${i < footerPages.length - 1 && renderTemplate`<span class="dot">·</span>`}` })}`)} </div> </ul> <!-- 💻 Desktop Footer --> <div class="sidebar-footer" id="sidebarFooter"> ${footerPages.map((p, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(`/${p.slug}`, "href")}>${p.title.rendered}</a> ${i < footerPages.length - 1 && renderTemplate`<span class="dot">·</span>`}` })}`)} </div> <!-- 🧠 Script für das mobile Menü --> ${renderScript($$result, "/Users/florianschneider/code/coodaa/lsd-website/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts")} </aside>`;
}, "/Users/florianschneider/code/coodaa/lsd-website/src/components/Sidebar.astro", void 0);

export { $$Sidebar as $ };
