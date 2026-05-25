# Template Capabilities

Use this matrix when choosing a starter or checking whether a template already covers a beginner workflow.

## Capability Matrix

| Template               | App shape                                            | UI system                                | Routing                                           | Server/API                                                            | Docs/testing baseline                                     |
| ---------------------- | ---------------------------------------------------- | ---------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------- |
| `viteplus-antd`        | React SPA admin dashboard                            | Ant Design 6, icons, chart example       | React Router Data Mode via `src/router/menus.tsx` | None built in                                                         | Component/router tests, README first-run commands         |
| `viteplus-antd-ssr`    | React Router framework app with SSG/SSR-ready config | Ant Design 6, dashboard shell            | `src/routes.ts` plus `src/router/menus.tsx`       | React Router server runtime when SSR is enabled                       | Component/router/utils tests, SSG/SSR README notes        |
| `viteplus-antd-mobile` | Mobile-first H5 app                                  | Ant Design Mobile, bottom tab navigation | `src/router/index.tsx`                            | None built in                                                         | Component/layout/router tests, mobile README flow         |
| `viteplus-fastify`     | Fastify API plus Vite-powered browser demo           | Plain client demo                        | Fastify route plugins under `src/routes/`         | Fastify 5, Swagger/OpenAPI, health check, optional Knex/Redis helpers | Route/config/utils tests, API docs, troubleshooting notes |

## Extension Entry Points

| Need                  | Template               | Start here                                                                            |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------- |
| Add an admin page     | `viteplus-antd`        | `src/pages/*`, then `src/router/menus.tsx`                                            |
| Add an SSR/SSG page   | `viteplus-antd-ssr`    | `src/routes.ts`, `src/pages/*`, then `src/router/menus.tsx`                           |
| Add a mobile tab/page | `viteplus-antd-mobile` | `src/pages/*`, `src/router/index.tsx`, optionally `src/layout/index.tsx`              |
| Add an API endpoint   | `viteplus-fastify`     | `src/routes/*`, then register in `src/server.ts`                                      |
| Add persistent data   | `viteplus-fastify`     | `src/model/*` for Knex/MySQL or a new data layer template if the app needs migrations |

## Verification Commands

| Template               | Install      | Check      | Test      | Build                        |
| ---------------------- | ------------ | ---------- | --------- | ---------------------------- |
| `viteplus-antd`        | `vp install` | `vp check` | `vp test` | `vp build`                   |
| `viteplus-antd-ssr`    | `vp install` | `vp check` | `vp test` | `vp exec react-router build` |
| `viteplus-antd-mobile` | `vp install` | `vp check` | `vp test` | `vp build`                   |
| `viteplus-fastify`     | `vp install` | `vp check` | `vp test` | `vp run build`               |

## Gaps by Design

The starters intentionally do not solve every production concern:

- Authentication and permission models are left out of the base Ant Design templates.
- Database migrations are not opinionated in the base Fastify template.
- Browser smoke tests are listed in the roadmap but are not yet wired into each template.
- Deployment targets are documented as future recipes because Docker, PM2, systemd, and static hosting need different defaults.

Use the [starter recipes](./recipes.md) for first extensions and the [ecosystem roadmap](./ecosystem-roadmap.md) for deciding which gaps should become templates.
