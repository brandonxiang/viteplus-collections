import { describe, it, expect } from 'vite-plus/test';
import type { MenuType, DataRouteConfig } from './index';

describe('types', () => {
  describe('MenuType', () => {
    it('should have required properties', () => {
      const menu: MenuType = {
        path: '/test',
        title: 'Test',
        icon: 'test-icon',
      };
      expect(menu.path).toBe('/test');
      expect(menu.title).toBe('Test');
    });

    it('should allow optional subMenu', () => {
      const menu: MenuType = {
        path: '/parent',
        title: 'Parent',
        icon: 'parent-icon',
        subMenu: [{ path: '/parent/child', title: 'Child', icon: 'child-icon' }],
      };
      expect(menu.subMenu).toHaveLength(1);
    });

    it('should allow optional properties', () => {
      const menu: MenuType = {
        path: '/test',
        title: 'Test',
        icon: 'test-icon',
        noMenu: true,
        hasPermission: false,
        redirect: '/other',
      };
      expect(menu.noMenu).toBe(true);
      expect(menu.hasPermission).toBe(false);
      expect(menu.redirect).toBe('/other');
    });
  });

  describe('DataRouteConfig', () => {
    it('should extend RouteObject', () => {
      const route: DataRouteConfig = {
        path: '/test',
        id: 'test-route',
        title: 'Test',
      };
      expect(route.path).toBe('/test');
      expect(route.id).toBe('test-route');
      expect(route.title).toBe('Test');
    });

    it('should allow children routes', () => {
      const route: DataRouteConfig = {
        path: '/parent',
        children: [{ path: 'child' }],
      };
      expect(route.children).toHaveLength(1);
    });
  });
});
