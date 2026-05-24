import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastifyStatic from '@fastify/static';
import fastifyVite from '@fastify/vite';
import { pathToFileURL } from 'url';
import type { FastifyInstance } from 'fastify';

// Routes
import HelloRouter from './routes/hello.js';
import { config } from './config/index.js';

export const createServer = () =>
  Fastify({
    logger: config.logging.prettyPrint
      ? {
          level: config.logging.level,
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }
      : {
          level: config.logging.level,
        },
    requestTimeout: 30000,
    keepAliveTimeout: 5000,
    bodyLimit: 1048576, // 1MB
  });

// Graceful shutdown handler
const gracefulShutdown = async (server: FastifyInstance, signal: string) => {
  server.log.info(`Received ${signal}, shutting down gracefully...`);
  try {
    await server.close();
    process.exit(0);
  } catch (err) {
    server.log.error({ err }, 'Error during shutdown');
    process.exit(1);
  }
};

// Register plugins and routes
export const buildServer = async () => {
  const server = createServer();

  try {
    // CORS configuration
    await server.register(cors, {
      origin: config.cors.origin,
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      credentials: config.cors.credentials,
    });

    if (config.swagger.enabled) {
      // Swagger documentation
      await server.register(swagger, {
        openapi: {
          openapi: '3.0.0',
          info: {
            title: 'VitePlus Fastify API',
            description: 'API documentation for VitePlus Fastify',
            version: '1.0.0',
          },
          servers: [
            {
              url: `http://localhost:${config.port}`,
              description: `${config.appEnv} server`,
            },
          ],
          components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
        },
      });

      await server.register(swaggerUi, {
        routePrefix: config.swagger.routePrefix,
        uiConfig: {
          docExpansion: 'list',
          deepLinking: false,
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
      });
    }

    // Static files
    await server.register(fastifyStatic, {
      root: config.static.root,
      prefix: config.static.prefix,
    });

    await server.register(fastifyVite, {
      root: config.vite.root,
      dev: config.vite.dev,
      spa: true,
    });

    // Health check endpoint
    server.get(
      '/health',
      {
        schema: {
          description: 'Health check endpoint',
          tags: ['health'],
          response: {
            200: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                timestamp: { type: 'number' },
                uptime: { type: 'number' },
              },
            },
          },
        },
      },
      async (_request, reply) =>
        reply.status(200).send({
          status: 'ok',
          timestamp: Date.now(),
          uptime: process.uptime(),
        }),
    );

    server.get('/', async (_request, reply) => reply.html());

    // Register route modules
    await server.register(HelloRouter, { prefix: '/api/hello' });

    // Error handler
    server.setErrorHandler(async (error, request, reply) => {
      server.log.error({ err: error }, 'Request error');

      if (reply.statusCode < 400) {
        reply.status(500);
      }

      const message = error instanceof Error ? error.message : String(error);

      return reply.send({
        error: {
          message,
          statusCode: reply.statusCode,
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      });
    });

    // 404 handler
    server.setNotFoundHandler(async (request, reply) =>
      reply.status(404).send({
        error: {
          message: 'Route not found',
          statusCode: 404,
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      }),
    );

    await server.vite.ready();

    return server;
  } catch (err) {
    console.error('Failed to build server:', err);
    server.log.error({ err }, 'Failed to build server');
    throw err;
  }
};

// Start server
const start = async () => {
  try {
    const app = await buildServer();

    const address = await app.listen({
      host: config.host,
      port: config.port,
    });

    app.log.info(`🚀 Server listening at ${address}`);
    app.log.info(`🧪 Demo page available at ${address}`);

    if (config.swagger.enabled) {
      app.log.info(`📚 Documentation available at ${address}${config.swagger.routePrefix}`);
      app.swagger();
    }

    process.on('SIGTERM', () => gracefulShutdown(app, 'SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown(app, 'SIGINT'));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

const isMainModule = process.argv[1]
  ? import.meta.url === pathToFileURL(process.argv[1]).href
  : false;

if (isMainModule) {
  void start();
}

export default buildServer;
