import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/Home/index.tsx', { id: 'home-index' }),
  route('menu1', 'pages/Home/index.tsx', { id: 'menu1' }),
  route('menu1/submenu1', 'pages/Home/index.tsx', { id: 'menu1-submenu1' }),
  route('menu2', 'pages/Home/index.tsx', { id: 'menu2' }),
  route('table-list', 'pages/TableList/index.tsx', { id: 'table-list' }),
  route('dashboard', 'pages/Dashboard/index.tsx', { id: 'dashboard' }),
  route('*', 'pages/404.tsx', { id: 'not-found' }),
] satisfies RouteConfig;
