<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-antd-mobile">
    <img src="./public/starter-logo.svg" width="120" alt="VitePlus Antd Mobile Logo" />
  </a>
</p>

<h1 align="center">VitePlus Antd Mobile</h1>

<p align="center">
  Production-ready mobile web starter powered by React 19, React Router 7, antd-mobile 5, TypeScript, and Vite+.
</p>

<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-antd-mobile/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-22c55e.svg" />
  </a>
  <a href="https://react.dev/">
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca" />
  </a>
  <a href="https://reactrouter.com/en/main">
    <img alt="React Router 7" src="https://img.shields.io/badge/React_Router-7-ca4245" />
  </a>
  <a href="https://mobile.ant.design/">
    <img alt="antd-mobile 5" src="https://img.shields.io/badge/antd--mobile-5-1677ff" />
  </a>
  <a href="https://viteplus.dev/">
    <img alt="Vite+" src="https://img.shields.io/badge/Built_with-Vite+-8b5cf6" />
  </a>
</p>

## Why this template

- Mobile-first UI foundation with `antd-mobile`
- Modern React stack: React 19 + React Router 7
- TypeScript-ready structure for scalable projects
- Unified DX with Vite+ (`vp`) for dev/build/lint/test/check
- Clean folder layout that is easy to extend

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
vp build
vp preview
npx lighthouse http://127.0.0.1:4173/ --preset=desktop
```

## Tech stack

- [React](https://react.dev/) 19
- [React Router](https://reactrouter.com/en/main) 7
- [antd-mobile](https://mobile.ant.design/) 5
- [TypeScript](https://www.typescriptlang.org/)
- [Vite+](https://viteplus.dev/)

## Quick start

### 1) Create project

```bash
vp create brandonxiang/viteplus-antd-mobile my-app
cd my-app
```

### 2) Install dependencies

```bash
vp install
```

### 3) Start development

```bash
vp dev
```

### 4) Build for production

```bash
vp build
```

### 5) Quality checks

```bash
vp check
vp test
```

## Available commands

| Command      | Description                       |
| ------------ | --------------------------------- |
| `vp dev`     | Start dev server                  |
| `vp build`   | Build for production              |
| `vp preview` | Preview production build          |
| `vp lint`    | Run lint checks                   |
| `vp fmt`     | Format source code                |
| `vp check`   | Run format, lint, and type checks |
| `vp test`    | Run tests                         |

## Project structure

```text
src/
├── components/      # Reusable components
├── pages/           # Page components
├── router/          # Route configuration
│   ├── index.tsx    # Router setup
│   └── routes.tsx   # Route definitions
├── layout/          # Layout components
├── App.tsx
└── main.tsx
```

## Development notes

- Use `vp` commands for package and tool workflows.
- Before opening PRs, run:

```bash
vp check
vp test
```

## License

[MIT](./LICENSE)
