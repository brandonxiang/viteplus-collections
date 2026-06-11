import type { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router';
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
        <meta name="description" content="A Vite+, React Router Framework, and Ant Design SSR admin dashboard template with routing, charts, and table examples." />
        <meta name="theme-color" content="#1677ff" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="VitePlus Antd SSR Admin" />
        <meta property="og:description" content="A Vite+, React Router Framework, and Ant Design SSR admin dashboard template." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.svg" />

        {/* DNS Prefetch & Preconnect */}
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />

        {/* Favicon & Icons */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/logo.svg"
          as="image"
          type="image/svg+xml"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'VitePlus Antd SSR Admin',
              description:
                'A Vite+, React Router Framework, and Ant Design SSR admin dashboard template.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
            }),
          }}
        />

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

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{status} — {message}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>{status}</h1>
          <p>{message}</p>
        </div>
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
