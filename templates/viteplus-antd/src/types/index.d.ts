import { RouteObject } from 'react-router';

export interface MenuType {
  path: string;
  title: string;
  icon: any;
  component?: any;
  noMenu?: boolean;
  hasPermission?: boolean;
  subMenu?: {
    path: string;
    title: string;
    icon: any;
    ret?: boolean;
    redirect?: string;
    component?: any;
    noMenu?: boolean;
    hasPermission?: boolean;
  }[];
  redirect?: string;
}

// Route configuration for data router mode
export interface DataRouteConfig extends Omit<RouteObject, 'children'> {
  id?: string;
  title?: string;
  icon?: any;
  noMenu?: boolean;
  hasPermission?: boolean;
  redirect?: string;
  children?: DataRouteConfig[];
}
