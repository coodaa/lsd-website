import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.lsd-berlin.de",
  outDir: "./dist",
  output: "static", // ✅ ganz wichtig
  server: {
    host: true,
  },
});
