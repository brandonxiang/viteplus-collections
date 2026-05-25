# Starter Playbook

This catalog is meant to make the first hour of a new Vite+ project predictable. Pick the smallest starter that proves the path you need, run the same Vite+ commands everywhere, then grow from the template's existing boundaries.

For a deeper feature comparison, use the [template capability matrix](./template-capabilities.md).

## Choose a Starter

| Need                                               | Start with             | Why                                                                                                         |
| -------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| Admin dashboard, internal tool, SaaS console       | `viteplus-antd`        | React SPA, React Router Data Mode, Ant Design layout, tables, charts, and route-driven menus                |
| SEO-sensitive React app or server-rendered console | `viteplus-antd-ssr`    | React Router SSR plus the same Ant Design application structure                                             |
| Mobile-first H5 app                                | `viteplus-antd-mobile` | Bottom navigation, mobile page structure, Ant Design Mobile components                                      |
| API service or full-stack Fastify app              | `viteplus-fastify`     | Fastify 5, Swagger/OpenAPI, health checks, typed config, optional MySQL/Redis utilities, and a browser demo |

## First Hour Checklist

1. Create the project:

   ```bash
   vp create @brandonxiang:viteplus-antd my-app
   cd my-app
   ```

2. Install and run:

   ```bash
   vp install
   vp dev
   ```

3. Run the quality gate before changing behavior:

   ```bash
   vp check
   vp test
   ```

4. Make one small change:
   - Ant Design starters: add or rename one route in `src/router/menus.tsx`.
   - Fastify starter: add one route plugin under `src/routes/` and register it from `src/server.ts`.

   Use the [starter recipes](./recipes.md) for copyable Ant Design page, mobile page, and Fastify API examples.

5. Re-run:

   ```bash
   vp check
   vp test
   ```

## Starter Boundaries

The templates intentionally keep the first decision simple:

- Use `vp` for install, dev, build, check, test, and package scripts.
- Keep Ant Design navigation route-driven. Add pages through route config before adding a second menu system.
- Keep Fastify APIs plugin-based. Add route modules before introducing a framework layer.
- Keep optional services optional. MySQL and Redis helpers are included, but the Fastify app should still start without local service dependencies.
- Keep validation close to entry points. Ant Design forms and Fastify schemas should reject bad input before business logic handles it.

## What Is Worth Adding Next

Use the [ecosystem roadmap](./ecosystem-roadmap.md) for prioritized next steps. Start with checks and documentation before adding more templates. A small catalog with reliable starter contracts is easier for beginners than a large catalog with unclear maintenance rules.

When a recipe needs to become a template, use the [template contract](./template-contract.md) before adding it to the catalog.
