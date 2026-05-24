import { Link, useLocation } from 'react-router';
import { Breadcrumb } from 'antd';
import './index.scss';
import { getMenusFromDataRoutes } from '@/router/config';

const getTitleByPath = (path: string) => {
  let title = '';
  getMenusFromDataRoutes().forEach((menu) => {
    if (menu.subMenu) {
      const subMenu = menu.subMenu.find((item) => item.path === path);
      if (subMenu) {
        title = subMenu.title;
      }
    }
    if (menu.path === path) {
      title = menu.title;
    }
  });
  return title;
};

export const BreadcrumbView = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i: string) => i) as string[];

  const extraBreadcrumbItems = pathSnippets.map((_item, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{getTitleByPath(url)}</Link>,
    };
  });

  return <Breadcrumb items={extraBreadcrumbItems} />;
};
