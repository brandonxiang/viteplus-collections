import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { dataRoutes } from './menus';
import NotFound from '@/pages/404';
import { PageLoading } from '@/components/PageLoading';
import { ContentLayout } from '@/layouts/BaseLayout';
import { DataRouteConfig } from '@/types';

// Create router using data mode with createBrowserRouter
export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: () => (
      <ContentLayout>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </ContentLayout>
    ),
    children: [
      ...dataRoutes.map((route: DataRouteConfig) => ({
        id: route.id,
        path: route.path === '/' ? undefined : route.path, // Use undefined for index route
        index: route.path === '/' ? true : undefined,
        Component: route.Component,
        loader: route.loader,
        action: route.action,
        errorElement: route.errorElement,
      })),
      // 404 catch-all route
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
