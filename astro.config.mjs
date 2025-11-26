import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel({
    runtime: "edge", // modern, stabil, kein entry.mjs
  }),
});
