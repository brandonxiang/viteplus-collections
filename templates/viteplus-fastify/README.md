<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-fastify">
    <img src="https://brandonxiang.top/icon/vite-template.jpeg" width="120px" alt="VitePlus Fastify Logo" />
  </a>
</p>

<h1 align="center">VitePlus Fastify</h1>
<p align="center">Modern Fastify full-stack starter with TypeScript, @fastify/vite & Vite+</p>

<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-fastify/stargazers"><img src="https://img.shields.io/github/stars/brandonxiang/viteplus-fastify" alt="Stars"></a>
  <a href="https://github.com/brandonxiang/viteplus-fastify/issues"><img src="https://img.shields.io/github/issues/brandonxiang/viteplus-fastify" alt="Issues"></a>
  <a href="https://github.com/brandonxiang/viteplus-fastify/blob/main/LICENSE"><img src="https://img.shields.io/github/license/brandonxiang/viteplus-fastify" alt="License"></a>
</p>

## Vite+ Powered

This project uses [Vite+](https://vite-plus.dev) - the unified toolchain for the web, providing:

- ⚡ **Lightning Fast** - Powered by Rolldown and Vite
- 🔧 **All-in-One** - Type checking, linting, formatting in one command
- 🚀 **Zero Config** - Sensible defaults with full customization
- 📦 **Smart Dependencies** - Automatic package management via `vp`

## Features

- ⚡ **Fastify 5.x** - Fast and efficient web framework
- 🔷 **TypeScript** - Full TypeScript support with latest ES2022 features
- 📚 **Swagger/OpenAPI** - Auto-generated API documentation
- 🖥️ **Hacker News Demo** - Root page renders a live HN briefing UI with `@fastify/vite`
- 🔄 **Hot Reload** - Development server with watch mode
- ⚙️ **Simple Env Config** - Works with defaults; `.env` is optional
- 🗄️ **Database Ready** - Knex.js integration with MySQL
- 🔗 **Redis Support** - IORedis integration
- 🛡️ **CORS** - Configurable CORS settings
- 🧪 **TypeScript Strict Mode** - Enhanced type safety
- 📦 **Vite+ Powered** - Powered by Rolldown, Vitest, Oxlint
- 🎨 **Code Quality** - Oxlint + Oxfmt for linting and formatting
- 🚦 **Health Checks** - Built-in health monitoring
- 🔧 **Graceful Shutdown** - Proper process management

## Requirements

- Node.js >= 18.0.0
- Vite+ (install via `npm install -g vite-plus`)

## Why This Template

Choose this template when you want a small Fastify application that is already ready for both API work and a browser UI:

- **One Fastify process** - API routes, Swagger docs, static assets, health checks, and the Vite-powered UI run from the same server.
- **Vite+ workflow** - Use `vp` for install, dev, build, check, formatting, testing, and dependency workflows.
- **Fastify 5 conventions** - Route plugins, schema-first validation, structured logging, graceful shutdown, and strict TypeScript are already wired.
- **Frontend demo included** - The root route renders a Hacker News briefing page through `@fastify/vite`, so the template proves the full stack path immediately.
- **Simple environment defaults** - The app runs without a `.env` file, while production settings remain configurable when you need them.
- **Service-ready foundation** - MySQL/Knex and Redis utilities are included for projects that need data persistence or caching.

## How To Use

Create a new project from this template with Vite+:

```bash
vp create brandonxiang/viteplus-fastify my-fastify-app
cd my-fastify-app
vp install
vp run dev
```

If you want to keep the default generated directory name, omit the target folder:

```bash
vp create brandonxiang/viteplus-fastify
```

Then visit:

- Hacker News Demo: <http://localhost:31303>
- Documentation: <http://localhost:31303/docs>
- Health Check: <http://localhost:31303/health>

## Manual Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd viteplus-fastify
   ```

2. **Install dependencies**

   ```bash
   vp install
   ```

3. **Optionally set environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Start development server**

   ```bash
   vp run dev
   ```

5. **Visit your application**
   - Hacker News Demo: <http://localhost:31303>
   - Documentation: <http://localhost:31303/docs>
   - Health Check: <http://localhost:31303/health>

## Scripts

| Command               | Description                                      |
| --------------------- | ------------------------------------------------ |
| `vp run dev`          | Start development server with hot reload         |
| `vp run build`        | Build for production with tree-shaking           |
| `vp run build:client` | Build the Fastify Vite demo client               |
| `vp run build:server` | Build the Fastify server                         |
| `vp run build:dev`    | Build for development                            |
| `vp run start`        | Start production server                          |
| `vp run start:prod`   | Start production server with NODE_ENV=production |
| `vp check`            | Run TypeScript, lint, and format checks          |
| `vp lint`             | Run ESLint                                       |
| `vp lint --fix`       | Run ESLint with auto-fix                         |
| `vp fmt`              | Format code with Oxfmt                           |
| `vp fmt --check`      | Check code formatting                            |
| `vp test`             | Run tests                                        |
| `vp run deps:check`   | Check for outdated dependencies                  |
| `vp run deps:update`  | Update dependencies                              |

## Project Structure

```
.
├── client/                 # Fastify Vite demo app
│   ├── index.html
│   ├── src/
│   │   ├── main.ts
│   │   └── styles.css
│   └── vite.config.ts
├── public/                 # Static assets served from /public/
├── src/
│   ├── config/             # Environment configuration
│   ├── constants/          # Application constants
│   ├── model/              # Database models (Knex.js)
│   ├── redis/              # Redis utilities
│   ├── routes/             # API routes
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Shared utilities
│   └── server.ts           # Fastify server entry
├── .env.example            # Optional environment overrides
└── tsdown.config.ts        # Server build config
```

## Configuration

The starter runs with sensible defaults, so a `.env` file is optional. Copy `.env.example` only when you need to override ports, CORS, service credentials, or runtime behavior.

### Core Settings

```bash
NODE_ENV=development         # Runtime environment
APP_ENV=development          # App environment label, defaults to NODE_ENV
PORT=31303                   # Server port
HOST=0.0.0.0                 # Server host
APP_REGION=sg                # Application region
LOG_LEVEL=info               # Pino log level
PRETTY_LOGS=true             # Pretty logs in development
```

### Fastify Vite

```bash
VITE_ROOT=client             # Demo app root
VITE_DEV=true                # Enable Vite dev server integration
```

### API Docs and Static Assets

```bash
SWAGGER_ENABLED=true
SWAGGER_ROUTE_PREFIX=/docs
STATIC_ROOT=public
STATIC_PREFIX=/public/
```

### CORS and Optional Services

```bash
CORS_ORIGIN=https://yourdomain.com,https://anotherdomain.com
CORS_CREDENTIALS=true

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=fastify_starter

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

In development, CORS allows local origins by default. In production, set `CORS_ORIGIN` to a comma-separated allowlist.

## Fastify Vite Demo

`@fastify/vite` is registered in the same Fastify server, so API routes and the Hacker News demo page share one process:

- `GET /` renders a Hacker News briefing page through Fastify Vite
- The client loads recent Hacker News stories and calls `GET /health` to show live API status
- Development uses Vite middleware through `vp run dev`
- Production uses `vp run build`, which builds the server to `dist/server.mjs` and the client to `dist/client`

To run the production output locally:

```bash
vp run build
vp run start
```

## API Documentation

The API documentation is automatically generated using Swagger/OpenAPI and available at `/docs` when running the server.

### Example Endpoints

- `GET /` - Hacker News briefing demo page
- `GET /health` - Health check
- `GET /api/hello/world?name=John` - Hello world with optional name
- `POST /api/hello/user` - Hello with user data
- `GET /api/hello/info` - Service information

## Modern Fastify Patterns

This starter implements the latest Fastify conventions:

### 1. Plugin Architecture

```typescript
const helloRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/world', { schema: helloWorldSchema }, async (request, reply) => {
    // Route handler
  });
};
```

### 2. Schema-First Approach

```typescript
const helloWorldSchema = {
  description: 'Hello World endpoint',
  tags: ['hello'],
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Name to greet' },
    },
  },
  response: {
    200: {
      /* response schema */
    },
  },
} as const;
```

### 3. TypeScript Integration

```typescript
interface HelloWorldQuery {
  name?: string;
}

fastify.get<{ Querystring: HelloWorldQuery }>(
  '/world',
  {
    schema: helloWorldSchema,
  },
  async (request, reply) => {
    const { name = 'World' } = request.query; // Fully typed
  },
);
```

### 4. Error Handling

```typescript
server.setErrorHandler(async (error, request, reply) => {
  server.log.error(error);
  return reply.send({
    error: {
      message: error.message,
      statusCode: reply.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    },
  });
});
```

### 5. Graceful Shutdown

```typescript
const gracefulShutdown = async (signal: string) => {
  server.log.info(`Received ${signal}, shutting down gracefully...`);
  try {
    await server.close();
    process.exit(0);
  } catch (err) {
    server.log.error('Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

## Database Integration

### Base Model Class

```typescript
import { config } from '../config/index.js';

export const KnexInstance = knex({
  client: 'mysql',
  connection: config.database,
});

export default class BasicModel<T extends Record<string, any>> {
  private builder: Knex.QueryBuilder;
  protected knex = KnexInstance;

  constructor(table: string) {
    this.builder = this.knex<T>(table);
  }

  async query(condition: Partial<T>): Promise<T[]> {
    return this.queryBuilder.where(condition).select('*');
  }
}
```

## Redis Integration

```typescript
import { config } from '../config/index.js';

const redis = new IORedis({
  host: config.redis.host,
  port: config.redis.port,
  ...(config.redis.password && { password: config.redis.password }),
});

export async function hget(key: string, field: string) {
  return redis.hget(key, field);
}
```

## Development

### Adding New Routes

1. Create a new route file in `src/routes/`
2. Define your schemas and interfaces
3. Export as FastifyPluginAsync
4. Register in `src/server.ts`

### Adding New Models

1. Create a model file in `src/model/`
2. Extend the BasicModel class
3. Define your entity interface
4. Add database-specific methods

## Production Deployment

1. **Build the application**

   ```bash
   vp run build
   ```

2. **Set production environment**

   ```bash
   export NODE_ENV=production
   ```

3. **Start the server**

   ```bash
   vp run start:prod
   ```

## Best Practices

1. **Use TypeScript strictly** - Enable all strict checks
2. **Schema validation** - Define schemas for all endpoints
3. **Error handling** - Implement comprehensive error handling
4. **Logging** - Use structured logging with Pino
5. **Configuration** - Use environment-based config
6. **Security** - Implement proper CORS and security headers
7. **Testing** - Cover route behavior and configuration defaults
8. **Documentation** - Keep API documentation up to date

## Optimization Ideas

These are good next steps as the starter grows:

1. **API plugin boundaries** - Move shared API hooks, decorators, and schemas into dedicated plugins once routes grow.
2. **Deployment examples** - Add Docker, systemd, or platform-specific deployment samples.
3. **OpenAPI regression tests** - Snapshot generated OpenAPI output to catch schema drift.
4. **Optional service health checks** - Add Redis/MySQL health checks behind flags so the starter still runs without local services.
5. **Browser smoke tests** - Add a Playwright smoke test for `/` and key API links.

## Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   lsof -ti:31303 | xargs kill -9
   ```

2. **Database connection issues**
   - Check your database credentials in `.env`
   - Ensure MySQL is running
   - Verify network connectivity

3. **Redis connection issues**
   - Check Redis server status
   - Verify Redis configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC License

---

**Happy coding with Fastify! 🚀**
