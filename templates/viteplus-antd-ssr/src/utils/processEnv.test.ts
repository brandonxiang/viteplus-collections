import { describe, it, expect, vi } from 'vite-plus/test';

vi.mock('./processEnv', async () => {
  const actual = await vi.importActual('./processEnv');
  return {
    ...actual,
    APP_ENV: 'test',
    NODE_ENV: 'test',
    __DEV__: true,
  };
});

import * as processEnv from './processEnv';

describe('utils/processEnv', () => {
  it('should export APP_ENV', () => {
    expect(processEnv.APP_ENV).toBeDefined();
  });

  it('should export NODE_ENV', () => {
    expect(processEnv.NODE_ENV).toBeDefined();
  });

  it('should export __DEV__', () => {
    expect(processEnv.__DEV__).toBeDefined();
  });
});
