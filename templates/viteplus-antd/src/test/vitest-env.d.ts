/// <reference types="vite-plus/test" />

interface ImportMetaEnv {
  readonly APP_ENV: string;
  readonly NODE_ENV: string;
  readonly __DEV__: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
