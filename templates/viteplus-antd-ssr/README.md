<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-antd-ssr">
    <img src="./public/logo.svg" width="120px" alt="VitePlus Antd SSR Logo" />
  </a>
</p>

<h1 align="center">VitePlus Antd SSR</h1>
<p align="center">React Router Framework template with SSR, optional SSG, Ant Design 6, React 19, TypeScript, and Vite+</p>

<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-antd-ssr/stargazers"><img src="https://img.shields.io/github/stars/brandonxiang/viteplus-antd-ssr" alt="Stars"></a>
  <a href="https://github.com/brandonxiang/viteplus-antd-ssr/issues"><img src="https://img.shields.io/github/issues/brandonxiang/viteplus-antd-ssr" alt="Issues"></a>
  <a href="https://github.com/brandonxiang/viteplus-antd-ssr/blob/main/LICENSE"><img src="https://img.shields.io/github/license/brandonxiang/viteplus-antd-ssr" alt="License"></a>
</p>

## Why This Template

This repository is the React Router Framework version of VitePlus Antd:

- **Framework mode** with `@react-router/dev` and `react-router.config.ts`
- **SSG by default** with React Router prerendering for a static, Lighthouse-friendly baseline
- **SSR-ready** configuration you can enable when you need runtime server rendering
- **Ant Design 6** dashboard shell, menu, breadcrumb, table, and chart examples
- **Vite+** workflow through the `vp` CLI for install, dev, check, test, and build

## Lighthouse 100

The template is tuned for a perfect desktop Lighthouse baseline:

| Category         | Score |
| ---------------- | ----- |
| Performance      | 100   |
| Accessibility    | 100   |
| Best Practices   | 100   |
| SEO              | 100   |
| Agentic Browsing | 100   |

Recheck locally after changes:

```bash
vp exec react-router build
vp preview
npx lighthouse http://127.0.0.1:4173/ --preset=desktop
```

## How to Use

```bash
# Create the project
vp create @brandonxiang:viteplus-antd-ssr my-app
cd my-app

# Install dependencies
vp install

# Start the React Router Framework dev server
vp dev

# Build framework output
vp exec react-router build
```

## Framework Mode

This template uses React Router Framework mode, not a pure SPA router setup.

- `react-router.config.ts` points React Router at `src/` and controls SSR/SSG output.
- `vite.config.ts` installs the React Router Vite plugin with `reactRouter()`.
- `src/root.tsx` owns the HTML document, metadata, layout shell, `<Outlet />`, scripts, and scroll restoration.
- `src/routes.ts` is the framework route manifest consumed by `@react-router/dev`.
- `package.json` runs framework commands through `vp exec react-router dev` and `vp exec react-router build`.

## SSG

SSG is enabled by default for fast static hosting and a stable Lighthouse baseline:

```ts
// react-router.config.ts
import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: true,
} satisfies Config;
```

With `ssr: false` and `prerender: true`, React Router generates static HTML for every static route and writes a SPA fallback for non-prerendered paths. Serve the generated `build/client` directory from any static host.

## SSR

Enable runtime SSR when routes need request-time data, sessions, or server-only logic:

```ts
// react-router.config.ts
import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: true,
} satisfies Config;
```

Hybrid SSR plus selected prerendered routes:

```ts
export default {
  appDirectory: 'src',
  ssr: true,
  async prerender() {
    return ['/', '/menu1', '/menu1/submenu1', '/menu2', '/table-list', '/dashboard'];
  },
} satisfies Config;
```

With `ssr: true`, deploy the generated server build with a React Router-compatible runtime. Use hybrid mode when the app needs runtime server rendering for dynamic routes but can still prerender stable marketing, dashboard, or documentation pages.

## Routing

Routing has two layers:

| File                   | Purpose                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `src/routes.ts`        | React Router Framework route manifest. Add real URL routes here.                        |
| `src/router/menus.tsx` | Dashboard menu metadata: title, icon, permissions, loaders, actions, and menu grouping. |
| `src/router/config.ts` | Small helpers that expose menu and route metadata to layout components and tests.       |

Add a page route in `src/routes.ts`:

```ts
import { route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('reports', 'pages/Reports/index.tsx', { id: 'reports' }),
] satisfies RouteConfig;
```

Then add its menu entry in `src/router/menus.tsx`:

```tsx
{
  id: 'reports',
  path: '/reports',
  title: 'Reports',
  icon: <DashboardOutlined />,
  Component: Reports,
}
```

Keep route IDs and paths aligned between both files. `src/routes.ts` controls what the framework can render; `src/router/menus.tsx` controls how the admin layout presents those routes in the navigation.

## Commands

```bash
vp dev                         # Start React Router Framework dev server
vp check                       # Format + lint + type-check
vp test                        # Run tests
vp exec react-router build     # Build framework output
```

Need to extend the generated app? Follow the [starter recipes](https://github.com/brandonxiang/viteplus-collections/blob/main/docs/recipes.md) for copyable Ant Design page and Fastify API examples. If setup gets stuck, use the [troubleshooting guide](https://github.com/brandonxiang/viteplus-collections/blob/main/docs/troubleshooting.md).

## Project Structure

```text
viteplus-antd-ssr/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components
│   ├── layouts/             # Admin layout, header, menu
│   ├── pages/               # Route modules
│   ├── router/              # Menu metadata and route helpers
│   ├── root.tsx             # Framework document and root layout
│   └── routes.ts            # Framework route manifest
├── react-router.config.ts   # SSR / SSG / framework config
├── vite.config.ts           # Vite+ and React Router plugin config
└── package.json
```

## Tech Stack

| Technology                                    | Version | Description                       |
| --------------------------------------------- | ------- | --------------------------------- |
| [React](https://react.dev/)                   | v19     | UI runtime                        |
| [React Router](https://reactrouter.com/)      | v7      | Framework mode, routing, SSR, SSG |
| [Ant Design](https://ant.design/)             | v6      | Enterprise UI components          |
| [Vite+](https://viteplus.dev/)                | v0.1+   | Unified web toolchain via `vp`    |
| [TypeScript](https://www.typescriptlang.org/) | v6      | Type safety                       |

## License

MIT © [brandonxiang](https://github.com/brandonxiang)
