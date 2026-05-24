import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { success } from '../utils/index.js';

// Define request/response interfaces
interface HelloWorldQuery {
  name?: string;
}

interface HelloUserBody {
  email?: string;
  show_mine?: boolean;
  project_name?: string;
  page?: number;
  size?: number;
}

// Schema definitions for better documentation and validation
const helloWorldSchema = {
  description: 'Hello World endpoint',
  tags: ['hello'],
  querystring: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name to greet',
        default: 'World',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            msg: { type: 'string' },
            name: { type: 'string' },
          },
        },
        ret: { type: 'number' },
        msg: { type: 'string' },
        timestamp: { type: 'number' },
      },
    },
  },
} as const;

const helloUserSchema = {
  description: 'Hello User endpoint with POST body',
  tags: ['hello'],
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
      },
      show_mine: {
        type: 'boolean',
        description: 'Show user specific data',
      },
      project_name: {
        type: 'string',
        description: 'Project name',
      },
      page: {
        type: 'number',
        minimum: 1,
        description: 'Page number for pagination',
      },
      size: {
        type: 'number',
        minimum: 1,
        maximum: 100,
        description: 'Page size for pagination',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                show_mine: { type: 'boolean' },
                project_name: { type: 'string' },
                pagination: {
                  type: 'object',
                  properties: {
                    page: { type: 'number' },
                    size: { type: 'number' },
                    total: { type: 'number' },
                  },
                },
              },
            },
          },
        },
        ret: { type: 'number' },
        msg: { type: 'string' },
        timestamp: { type: 'number' },
      },
    },
  },
} as const;

// Plugin using modern async/await pattern
const helloRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // GET /world with optional name query parameter
  fastify.get<{ Querystring: HelloWorldQuery }>(
    '/world',
    {
      schema: helloWorldSchema,
    },
    async (request, reply) => {
      const { name = 'World' } = request.query;

      return reply.send(
        success({
          msg: `Hello ${name}!`,
          name,
        }),
      );
    },
  );

  // POST /user - Example with request body
  fastify.post<{ Body: HelloUserBody }>(
    '/user',
    {
      schema: helloUserSchema,
    },
    async (request, reply) => {
      const { email, show_mine, project_name, page = 1, size = 10 } = request.body;

      const userData = {
        email,
        show_mine,
        project_name,
        pagination: {
          page,
          size,
          total: 100, // Example total
        },
      };

      return reply.send(
        success({
          message: `Hello user with email: ${email || 'unknown'}!`,
          user: userData,
        }),
      );
    },
  );

  // GET /info - Server info endpoint
  fastify.get(
    '/info',
    {
      schema: {
        description: 'Get hello service information',
        tags: ['hello'],
        response: {
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  service: { type: 'string' },
                  version: { type: 'string' },
                  uptime: { type: 'number' },
                },
              },
              ret: { type: 'number' },
              msg: { type: 'string' },
              timestamp: { type: 'number' },
            },
          },
        },
      },
    },
    async (_request, reply) =>
      reply.send(
        success({
          service: 'Hello Service',
          version: '1.0.0',
          uptime: process.uptime(),
        }),
      ),
  );
};

export default helloRoutes;
