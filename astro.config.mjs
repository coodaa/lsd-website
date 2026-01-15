import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lsd-berlin.de", // 🔴 extrem wichtig für SEO
  output: "server",

  integrations: [
    sitemap(), // ✅ erzeugt /sitemap.xml automatisch
  ],

  adapter: vercel({
    runtime: "edge",
  }),
});
