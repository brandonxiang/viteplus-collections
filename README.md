<p align="center">
  <img src="./assets/logo.svg" width="120" alt="VitePlus Collections logo" />
</p>

<h1 align="center">VitePlus Collections</h1>

<p align="center">
  A bundled Vite+ template catalog for React, Ant Design, mobile apps, SSR, and Fastify services.
</p>

<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-collections"><img src="https://img.shields.io/github/stars/brandonxiang/viteplus-collections" alt="GitHub stars" /></a>
  <a href="https://github.com/brandonxiang/viteplus-collections/issues"><img src="https://img.shields.io/github/issues/brandonxiang/viteplus-collections" alt="GitHub issues" /></a>
  <a href="https://github.com/brandonxiang/viteplus-collections/blob/main/LICENSE"><img src="https://img.shields.io/github/license/brandonxiang/viteplus-collections" alt="License" /></a>
</p>

## Overview

This repository publishes `@brandonxiang/create`, a Vite+ organization-style template package. `vp create @brandonxiang` reads the root `createConfig.templates` manifest and scaffolds one of the bundled templates from `templates/*`.

The repository itself is a monorepo. The root package is the catalog and release unit; each directory under `templates/` is a complete starter project with its own dependencies, lockfile, Vite+ configuration, tests, and documentation.

## Templates

| Template               | Source directory                 | Best for                                                     |
| ---------------------- | -------------------------------- | ------------------------------------------------------------ |
| `viteplus-antd`        | [`templates/viteplus-antd`](./templates/viteplus-antd/)        | React SPA admin dashboards with Ant Design and React Router  |
| `viteplus-antd-ssr`    | [`templates/viteplus-antd-ssr`](./templates/viteplus-antd-ssr/)    | Server-rendered React Router applications with Ant Design    |
| `viteplus-antd-mobile` | [`templates/viteplus-antd-mobile`](./templates/viteplus-antd-mobile/) | Mobile-first React applications with Ant Design Mobile       |
| `viteplus-fastify`     | [`templates/viteplus-fastify`](./templates/viteplus-fastify)     | Fastify API and full-stack service starters powered by Vite+ |

## Usage

Open the interactive picker:

```bash
vp create @brandonxiang
```

Create a specific template:

```bash
vp create @brandonxiang:viteplus-antd my-admin
vp create @brandonxiang:viteplus-antd-ssr my-ssr-app
vp create @brandonxiang:viteplus-antd-mobile my-mobile-app
vp create @brandonxiang:viteplus-fastify my-api
```

Then install and start the generated project:

```bash
cd my-admin
vp install
vp dev
```

## Repository Layout

```text
.
├── assets/
│   └── logo.svg
├── templates/
│   ├── viteplus-antd/
│   ├── viteplus-antd-ssr/
│   ├── viteplus-antd-mobile/
│   └── viteplus-fastify/
├── package.json
├── pnpm-workspace.yaml
└── vite.config.ts
```

## Development

Install workspace dependencies:

```bash
vp install
```

Run root catalog checks:

```bash
vp check
vp test
```

Inspect the package contents before publishing:

```bash
vp pm pack
```

The root test command checks the catalog package only. Run a template's own checks from that template directory when changing template implementation code.

## Publishing

The package is published as `@brandonxiang/create`. The published package includes:

- `README.md`
- `assets/`
- `templates/`
- the root `createConfig.templates` manifest in `package.json`

After publishing, verify the manifest through Vite+:

```bash
vp create @brandonxiang --no-interactive
```
