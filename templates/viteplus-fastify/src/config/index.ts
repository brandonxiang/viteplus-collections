import path from 'path';

export interface AppConfig {
  port: number;
  host: string;
  nodeEnv: string;
  appEnv: string;
  appRegion: string;
  cors: {
    origin: string[] | boolean;
    credentials: boolean;
  };
  swagger: {
    enabled: boolean;
    routePrefix: string;
  };
  logging: {
    level: string;
    prettyPrint: boolean;
  };
  static: {
    root: string;
    prefix: string;
  };
  vite: {
    root: string;
    dev: boolean;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
}

const readString = (key: string, fallback: string) => process.env[key]?.trim() || fallback;

const readNumber = (key: string, fallback: number) => {
  const value = Number(process.env[key]);
  return Number.isFinite(value) ? value : fallback;
};

const readBoolean = (key: string, fallback: boolean) => {
  const value = process.env[key]?.trim().toLowerCase();

  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value);
};

const readList = (key: string) =>
  (process.env[key] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

export const getConfig = (): AppConfig => {
  const nodeEnv = readString('NODE_ENV', 'development');
  const appEnv = readString('APP_ENV', nodeEnv);
  const isProduction = nodeEnv === 'production';
  const isDevelopment = nodeEnv === 'development';
  const corsOrigins = readList('CORS_ORIGIN');

  return {
    port: readNumber('PORT', 31303),
    host: readString('HOST', '0.0.0.0'),
    nodeEnv,
    appEnv,
    appRegion: readString('APP_REGION', 'sg'),

    cors: {
      origin: isProduction && corsOrigins.length > 0 ? corsOrigins : isDevelopment,
      credentials: readBoolean('CORS_CREDENTIALS', true),
    },

    swagger: {
      enabled: readBoolean('SWAGGER_ENABLED', !isProduction),
      routePrefix: readString('SWAGGER_ROUTE_PREFIX', '/docs'),
    },

    logging: {
      level: readString('LOG_LEVEL', isProduction ? 'warn' : 'info'),
      prettyPrint: readBoolean('PRETTY_LOGS', isDevelopment),
    },

    static: {
      root: path.resolve(readString('STATIC_ROOT', 'public')),
      prefix: readString('STATIC_PREFIX', '/public/'),
    },

    vite: {
      root: path.resolve(readString('VITE_ROOT', 'client')),
      dev: readBoolean('VITE_DEV', isDevelopment),
    },

    database: {
      host: readString('DB_HOST', 'localhost'),
      port: readNumber('DB_PORT', 3306),
      user: readString('DB_USER', 'root'),
      password: readString('DB_PASSWORD', ''),
      database: readString('DB_DATABASE', 'fastify_starter'),
    },

    redis: {
      host: readString('REDIS_HOST', 'localhost'),
      port: readNumber('REDIS_PORT', 6379),
      ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
    },
  };
};

export const config = getConfig();

export default config;
