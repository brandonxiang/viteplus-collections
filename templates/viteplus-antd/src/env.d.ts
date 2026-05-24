declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    APP_ENV: 'test' | 'uat' | 'live';
    __DEV__: boolean;
  }
}
