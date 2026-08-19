import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        artists: resolve(__dirname, 'artists.html'),
        urbanhippieart: resolve(__dirname, 'urbanhippieart.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
