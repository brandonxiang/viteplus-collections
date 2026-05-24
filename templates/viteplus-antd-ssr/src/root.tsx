import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Suspense } from 'react';
import { ContentLayout } from '@/layouts/BaseLayout';
import { PageLoading } from '@/components/PageLoading';
import './index.scss';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A Vite+, React Router Framework, and Ant Design SSR admin dashboard template with routing, charts, and table examples."
        />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <title>VitePlus Antd SSR Admin</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ContentLayout>
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
    </ContentLayout>
  );
}
