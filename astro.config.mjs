import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://www.lsd-berlin.de",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
