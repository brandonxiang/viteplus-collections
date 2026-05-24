/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { defineConfig, loadEnv } from 'vite-plus';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
const mode = process.env.NODE_ENV ?? 'development';
const isDev = mode === 'development';
const viteEnv = loadEnv('', process.cwd());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  fmt: {
    singleQuote: true,
  },
  lint: {
    ignorePatterns: ['dist/', 'node_modules/'],
  },
  staged: {
    '*.{js,jsx,ts,tsx}': ['vp lint --fix', 'vp fmt'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.APP_ENV': JSON.stringify(viteEnv.VITE_APP_ENV),
    'process.env.__DEV__': isDev,
  },
  build: {
    target: 'es2015',
    sourcemap: mode === 'production',
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react', test: /\/react(?:-dom|-router)?/ },
            { name: 'antd', test: /\/antd\/.*/ },
            { name: 'antv', test: /[\\/]node_modules[\\/]@antv[\\/]/ },
          ],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
