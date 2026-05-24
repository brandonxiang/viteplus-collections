import { defineConfig } from 'vite-plus';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 70,
        functions: 50,
        statements: 60,
        branches: 45,
      },
    },
  },
  fmt: {
    singleQuote: true,
    ignorePatterns: ['.react-router/**', 'build/**', 'dist/**', 'node_modules/**'],
  },
  lint: {
    env: {
      builtin: true,
    },
    ignorePatterns: ['.react-router/**', 'build/**', 'dist/**', 'node_modules/**'],
    overrides: [
      {
        files: ['**/*.{ts,tsx}'],
        rules: {
          'react-hooks/rules-of-hooks': 'error',
          'react-hooks/exhaustive-deps': 'warn',
        },
        env: {
          es2020: true,
          browser: true,
        },
        plugins: ['react'],
      },
    ],
  },
  staged: {
    '*.{js,jsx,ts,tsx}': ['vp lint --fix', 'vp fmt'],
  },
  build: {
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react', test: /\/react(?:-dom|-router)?/ },
            { name: 'antd', test: /\/antd\/.*/ },
          ],
        },
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
