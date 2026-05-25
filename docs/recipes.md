# Starter Recipes

Use these recipes after creating a project from the catalog. They are intentionally small: each one adds a single visible behavior, then runs the same Vite+ quality gate.

## Add an Ant Design Page

Use this for `viteplus-antd`. The SSR template uses the same menu metadata, but also requires the React Router Framework route entry shown below.

1. Create a page module:

   ```tsx
   // src/pages/Reports/index.tsx
   import { Card, Typography } from 'antd';

   const Reports = () => (
     <Card>
       <Typography.Title level={3}>Reports</Typography.Title>
       <Typography.Paragraph>Replace this with your first business view.</Typography.Paragraph>
     </Card>
   );

   export default Reports;
   ```

2. Register it in `src/router/menus.tsx`:

   ```tsx
   import { BarChartOutlined } from '@ant-design/icons';

   const Reports = lazy(() => import('@/pages/Reports'));

   export const dataRoutes: DataRouteConfig[] = [
     // existing routes
     {
       id: 'reports',
       path: '/reports',
       title: 'Reports',
       icon: <BarChartOutlined />,
       Component: Reports,
     },
   ];
   ```

3. For `viteplus-antd-ssr`, also add the framework route in `src/routes.ts` before the `route('*', ...)` catch-all:

   ```ts
   import { route, type RouteConfig } from '@react-router/dev/routes';

   export default [
     // existing routes
     route('reports', 'pages/Reports/index.tsx', { id: 'reports' }),
   ] satisfies RouteConfig;
   ```

4. Verify:

   ```bash
   vp check
   vp test
   ```

## Add an Ant Design Mobile Page

Use this for `viteplus-antd-mobile`.

1. Create a page module:

   ```tsx
   // src/pages/reports/index.tsx
   import { List, NavBar } from 'antd-mobile';

   const ReportsPage = () => (
     <>
       <NavBar back={null}>Reports</NavBar>
       <List>
         <List.Item description="Start with one mobile workflow.">Daily report</List.Item>
       </List>
     </>
   );

   export default ReportsPage;
   ```

2. Add the lazy import and child route in `src/router/index.tsx`:

   ```tsx
   const Reports = lazy(() => import('../pages/reports'));

   export const router = createBrowserRouter([
     {
       path: '/',
       element: <Layout />,
       children: [
         // existing routes
         {
           path: 'reports',
           element: <Reports />,
           errorElement: <ErrorBoundary />,
         },
       ],
     },
   ]);
   ```

3. If the page should be available from the bottom navigation, add the matching item in `src/layout/index.tsx`.

4. Verify:

   ```bash
   vp check
   vp test
   ```

## Add a Fastify API Plugin

Use this for `viteplus-fastify`.

1. Create a route plugin:

   ```ts
   // src/routes/tasks.ts
   import type { FastifyPluginAsync } from 'fastify';
   import { success } from '../utils/index.js';

   type TaskQuery = {
     status?: 'open' | 'done';
   };

   const tasksRoutes: FastifyPluginAsync = async (fastify) => {
     fastify.get<{ Querystring: TaskQuery }>(
       '/',
       {
         schema: {
           description: 'List tasks',
           tags: ['tasks'],
           querystring: {
             type: 'object',
             properties: {
               status: { type: 'string', enum: ['open', 'done'] },
             },
           },
         },
       },
       async (request, reply) =>
         reply.send(
           success({
             filters: request.query,
             items: [],
           }),
         ),
     );
   };

   export default tasksRoutes;
   ```

2. Register it in `src/server.ts`:

   ```ts
   import TasksRouter from './routes/tasks.js';

   await server.register(TasksRouter, { prefix: '/api/tasks' });
   ```

3. Add a route test next to the plugin:

   ```ts
   // src/routes/tasks.test.ts
   import { describe, expect, it, beforeAll, afterAll } from 'vite-plus/test';
   import Fastify from 'fastify';
   import TasksRouter from './tasks.js';

   describe('Tasks Routes', () => {
     const server = Fastify({ logger: false });

     beforeAll(async () => {
       await server.register(TasksRouter);
       await server.ready();
     });

     afterAll(async () => {
       await server.close();
     });

     it('lists tasks', async () => {
       const response = await server.inject({ method: 'GET', url: '/?status=open' });

       expect(response.statusCode).toBe(200);
       expect(response.json().data).toEqual({
         filters: { status: 'open' },
         items: [],
       });
     });
   });
   ```

4. Verify:

   ```bash
   vp check
   vp test
   ```

## Before Adding a New Template

Add a new template only when a recipe becomes repetitive enough that users would otherwise copy multiple files by hand. When you do add one:

- Create `templates/<name>/package.json`, `README.md`, `AGENTS.md`, and `vite.config.ts`.
- Add it to `createConfig.templates` in the root `package.json`.
- Add first-run commands to the template README.
- Run `vp check`, `vp test`, and `vp pm pack`.

Use the [template contract](./template-contract.md) for the complete starter checklist.
