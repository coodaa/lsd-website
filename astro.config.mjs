import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://www.lsd-berlin.de",
  outDir: "./dist",
  output: "server", // ⬅️ statt "static"
  adapter: node({ mode: "standalone" }), // ⬅️ Node-Adapter aktivieren
  server: {
    host: true,
  },
});
