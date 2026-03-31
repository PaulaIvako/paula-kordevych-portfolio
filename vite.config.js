import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Read projects data
const projectsData = JSON.parse(fs.readFileSync('./src/data/projects.json', 'utf-8'));

// Generate input entries for all pages
const inputEntries = {
  main: resolve(__dirname, 'src/index.html'),
  about: resolve(__dirname, 'src/about.html'),
};

// Add project pages
projectsData.projects.forEach(project => {
  inputEntries[`project-${project.id}`] = resolve(__dirname, `src/projects/${project.id}.html`);
});

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: inputEntries,
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/i.test(assetInfo.name)) {
            return 'css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  publicDir: '../public',
  server: {
    port: 3000,
    open: true,
  },
});