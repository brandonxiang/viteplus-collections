/// <reference types="vite-plus/test" />
/// <reference types="@testing-library/jest-dom" />

interface ImportMetaEnv {
  readonly APP_ENV: string;
  readonly NODE_ENV: string;
  readonly __DEV__: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
