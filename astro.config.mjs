import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",         // wichtig für WP-Live-Fetch
  adapter: vercel(),
  site: "https://www.lsd-berlin.de",
});
