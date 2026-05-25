# Troubleshooting

Use this guide when a generated starter does not install, start, check, test, or build as expected.

## First Checks

Run these from the generated project directory:

```bash
vp install
vp check
vp test
```

If toolchain behavior looks wrong, capture the environment report:

```bash
vp env doctor
```

Include that output when asking for help. It is more useful than only sharing the final error line.

## Command Not Found

If `vp` is not available, install Vite+ globally or use the setup method recommended by your environment:

```bash
npm install -g vite-plus
```

Then confirm:

```bash
vp help
```

## Install Problems

If install fails after switching branches or templates:

```bash
vp install
```

If the package manager reports ignored build scripts, follow the package manager prompt only when you trust the dependency source. Do not approve scripts blindly in shared or CI environments.

## Port Already In Use

For SPA and mobile templates, Vite usually offers another port automatically. For Fastify, the default port is `31303`.

Find the process using that port:

```bash
lsof -ti:31303
```

Stop it if it is safe to do so, or run the Fastify starter with another port:

```bash
PORT=31304 vp run dev
```

## Build Fails

Use the build command documented by the template README:

| Template               | Build command                |
| ---------------------- | ---------------------------- |
| `viteplus-antd`        | `vp build`                   |
| `viteplus-antd-ssr`    | `vp exec react-router build` |
| `viteplus-antd-mobile` | `vp build`                   |
| `viteplus-fastify`     | `vp run build`               |

Before debugging the build, run:

```bash
vp check
vp test
```

Type, lint, and unit test failures are usually faster to diagnose than production build output.

## Fastify API Does Not Respond

From `viteplus-fastify`, start the dev server:

```bash
vp run dev
```

Then check:

- Demo page: <http://localhost:31303>
- Health check: <http://localhost:31303/health>
- Swagger docs: <http://localhost:31303/docs>

If `/docs` is missing in production, check `SWAGGER_ENABLED`. The starter disables Swagger by default in production unless configured otherwise.

## Ant Design Page Does Not Appear

For `viteplus-antd`, confirm the page is registered in `src/router/menus.tsx`.

For `viteplus-antd-ssr`, confirm both files are updated:

- `src/routes.ts`
- `src/router/menus.tsx`

For `viteplus-antd-mobile`, confirm both route and navigation updates if the page should appear in the bottom tab bar:

- `src/router/index.tsx`
- `src/layout/index.tsx`

Use the starter recipes for copyable examples: <https://github.com/brandonxiang/viteplus-collections/blob/main/docs/recipes.md>

## Still Stuck

Collect:

- The template name
- The command you ran
- The full error output
- `vp env doctor` output
- Whether the failure happens before or after modifying the generated project

That context is enough to separate template issues from local environment or project changes.
