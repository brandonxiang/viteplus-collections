import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import viteFastify from '@fastify/vite/plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    viteFastify({
      spa: true,
    }),
  ],
});
