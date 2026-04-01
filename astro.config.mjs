import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  server: {
    port: 3000,
    host: true
  }
});
