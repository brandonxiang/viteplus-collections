<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-antd">
    <img src="./public/logo.svg" width="120px" alt="VitePlus Antd Logo" />
  </a>
</p>

<h1 align="center">VitePlus Antd</h1>
<p align="center">Modern React SPA template with React Router Data Mode, Ant Design 6 & Vite+</p>

<p align="center">
  <a href="https://github.com/brandonxiang/viteplus-antd/stargazers"><img src="https://img.shields.io/github/stars/brandonxiang/viteplus-antd" alt="Stars"></a>
  <a href="https://github.com/brandonxiang/viteplus-antd/issues"><img src="https://img.shields.io/github/issues/brandonxiang/viteplus-antd" alt="Issues"></a>
  <a href="https://github.com/brandonxiang/viteplus-antd/blob/main/LICENSE"><img src="https://img.shields.io/github/license/brandonxiang/viteplus-antd" alt="License"></a>
</p>

## ✨ Why This Template

This is the fastest way to start a modern React SPA with:

- **React Router Data Mode** for elegant data loading and state management
- **Ant Design 6** with its latest component improvements and theming system
- **Vite+** unified toolchain (`vp`) for dev/build/test/lint/format
- **Full TypeScript** support for type-safe development

## ✅ Lighthouse 100

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

## 📦 How to Use

```bash
# Pick from the Brandon Xiang template catalog
vp create @brandonxiang

# Or create this template directly
vp create @brandonxiang:viteplus-antd my-app
cd my-app

# Install dependencies
vp install

# Start development server
vp dev

# Build for production
vp build
```

## 🚀 Key Technologies

| Technology                                    | Version | Description                           |
| --------------------------------------------- | ------- | ------------------------------------- |
| [React](https://react.dev/)                   | v19     | Modern React with latest features     |
| [React Router](https://reactrouter.com/)      | v7      | Data Router Mode for enhanced routing |
| [Ant Design](https://ant.design/)             | v6      | Enterprise-class UI component library |
| [Vite+](https://viteplus.dev/)                | v0.1+   | Unified web toolchain via `vp` CLI    |
| [TypeScript](https://www.typescriptlang.org/) | v5.9    | Type safety and better DX             |

## 🎨 Ant Design 6 Highlights

Ant Design 6 brings significant improvements:

- **CSS-in-JS Refactoring**: New CSS-in-JS engine for better performance and dynamic theming
- **Enhanced Component API**: More flexible and consistent component interfaces
- **Improved Performance**: Optimized rendering and reduced bundle size
- **Better Dark Mode**: Improved dark theme support and customization
- **Updated Design System**: Refined design tokens and component styles
- **TypeScript Improvements**: Better type inference and autocompletion

```tsx
import { ConfigProvider, theme } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

## 🧭 React Router Data Mode

This template leverages React Router 7's Data Mode for configuration-driven routing:

### Key Benefits

- **Configuration-First**: Define routes in a single configuration file
- **Data Loading**: Load data before component rendering with loaders
- **Form Actions**: Handle mutations with actions
- **Error Boundaries**: Built-in error handling per route
- **Type Safety**: Full TypeScript support for route params and data

### Configuration Example

All routes are defined in `src/router/menus.tsx`:

```tsx
export const dataRoutes: DataRouteConfig[] = [
  {
    id: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    Component: Dashboard,
    loader: async ({ params }) => {
      const data = await fetchDashboardData();
      return data;
    },
  },
  {
    id: 'table-list',
    path: '/table-list',
    title: 'Table List',
    icon: <TableOutlined />,
    Component: TableList,
    action: async ({ request }) => {
      const formData = await request.formData();
      await saveTableData(formData);
      return redirect('/table-list');
    },
  },
];
```

### Menu Auto-Generation

Routes are automatically converted into a menu structure:

```tsx
// Routes in menus.tsx → Auto-generated menu
{
  id: 'menu1',
  path: '/menu1',
  title: 'Menu 1',
  icon: <HomeOutlined />,
  Component: Home,
  subMenu: [
    {
      id: 'menu1-submenu1',
      path: '/menu1/submenu1',
      title: 'Submenu 1',
      icon: <UnorderedListOutlined />,
      Component: Home,
    },
  ],
}
```

## ⚡ Vite+ Support

This template is fully aligned with **Vite+** workflow:

- Use `vp` as the single entrypoint for install/dev/check/test/build
- Keep package manager operations behind `vp` (`vp install`, `vp add`, `vp remove`)
- Run quality gates with `vp check` and `vp test`
- Use `vite-plus` imports in config/test runtime APIs

```bash
vp install
vp dev
vp check
vp test
vp build
```

## 🛠️ Development

```bash
vp dev              # Start dev server
vp check            # Format + lint + type-check
vp test             # Run tests
vp build            # Build for production
```

## 📁 Project Structure

```
viteplus-antd/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   ├── router/          # Route configurations
│   │   ├── menus.tsx    # Route definitions
│   │   └── index.tsx    # Router setup
│   ├── App.tsx          # Root component
│   └── index.tsx        # Entry point
└── package.json
```

## 🔗 Adding a New Route

1. Create your page component in `src/pages/`
2. Add route to `src/router/menus.tsx`:

```tsx
import { lazy } from 'react';
import { YourIcon } from '@ant-design/icons';

const YourPage = lazy(() => import('@/pages/YourPage'));

export const dataRoutes: DataRouteConfig[] = [
  // ... existing routes
  {
    id: 'your-page',
    path: '/your-page',
    title: 'Your Page',
    icon: <YourIcon />,
    Component: YourPage,
    // Optional: Add data loading
    loader: async ({ params }) => {
      const data = await fetchData();
      return data;
    },
    // Optional: Add form action
    action: async ({ request }) => {
      const formData = await request.formData();
      await processData(formData);
      return redirect('/your-page');
    },
  },
];
```

3. The menu will update automatically!

### Documentation

- [React Router Data API](https://reactrouter.com/en/main/route/route#data-apis)
- [Ant Design 6 Documentation](https://ant.design/docs/spec/introduce)
- [Vite+ Documentation](https://viteplus.dev/)
- [Vite Documentation](https://vite.dev/guide/)
- [React 19 Documentation](https://react.dev/learn)

## 📝 License

MIT © [brandonxiang](https://github.com/brandonxiang)

---

<p align="center">
  <sub>Built with ❤️ using React, Ant Design, and Vite</sub>
</p>
