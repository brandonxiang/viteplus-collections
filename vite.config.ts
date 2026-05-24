import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    exclude: ['templates/**'],
    passWithNoTests: true,
  },
  fmt: {
    singleQuote: true,
  },
  lint: {
    ignorePatterns: ['node_modules/', 'dist/', 'build/', '**/.react-router/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
