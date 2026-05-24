import { describe, it, expect } from 'vite-plus/test';
import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router';
import { getDataRoutes } from './config';

describe('router/index', () => {
  it('should create router with data routes', () => {
    const routes = getDataRoutes();
    const router = createBrowserRouter([
      {
        path: '/',
        Component: () => <div>Home</div>,
        children: routes as any,
      },
    ]);
    expect(router).toBeDefined();
  });

  it('should render router provider', () => {
    const router = createBrowserRouter([
      {
        path: '/',
        Component: () => <div>Home</div>,
      },
    ]);
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeInTheDocument();
  });
});
