import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { getConfig } from './index.js';

describe('config', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('uses minimal defaults without requiring an env file', () => {
    vi.stubEnv('NODE_ENV', 'development');

    const config = getConfig();

    expect(config.port).toBe(31303);
    expect(config.host).toBe('0.0.0.0');
    expect(config.appEnv).toBe('development');
    expect(config.cors.origin).toBe(true);
    expect(config.swagger.enabled).toBe(true);
    expect(config.vite.dev).toBe(true);
  });

  it('parses production overrides', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('PORT', '8080');
    vi.stubEnv('CORS_ORIGIN', 'https://example.com, https://admin.example.com');
    vi.stubEnv('SWAGGER_ENABLED', 'true');
    vi.stubEnv('PRETTY_LOGS', 'false');

    const config = getConfig();

    expect(config.port).toBe(8080);
    expect(config.cors.origin).toEqual(['https://example.com', 'https://admin.example.com']);
    expect(config.swagger.enabled).toBe(true);
    expect(config.logging.prettyPrint).toBe(false);
    expect(config.vite.dev).toBe(false);
  });

  it('falls back when numeric env values are invalid', () => {
    vi.stubEnv('PORT', 'not-a-number');
    vi.stubEnv('DB_PORT', 'invalid');

    const config = getConfig();

    expect(config.port).toBe(31303);
    expect(config.database.port).toBe(3306);
  });
});
