import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.lsd-berlin.de',
  outDir: './dist',
  output: 'server', // <-- hier von "static" auf "server" ändern
  server: {
    host: true, // erlaubt localhost-Zugriff im Dev-Modus
  },
});
