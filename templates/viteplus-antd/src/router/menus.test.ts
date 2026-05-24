import { describe, it, expect } from 'vite-plus/test';
import { extractMenuStructure, dataRoutes } from '@/router/menus';

describe('router/menus', () => {
  describe('extractMenuStructure', () => {
    it('should return empty array for empty routes', () => {
      const result = extractMenuStructure([]);
      expect(result).toEqual([]);
    });

    it('should handle routes without title', () => {
      const routes = [{ path: '/hidden' }];
      const result = extractMenuStructure(routes as any);
      expect(result).toEqual([]);
    });

    it('should extract root path as menu item', () => {
      const routes = [{ path: '/', title: 'Home' }];
      const result = extractMenuStructure(routes as any);
      expect(result).toHaveLength(1);
      expect(result[0].path).toBe('/');
      expect(result[0].title).toBe('Home');
    });

    it('should group first-level routes', () => {
      const routes = [
        { path: '/about', title: 'About' },
        { path: '/contact', title: 'Contact' },
      ];
      const result = extractMenuStructure(routes as any);
      expect(result).toHaveLength(2);
      expect(result.map((m) => m.path)).toContain('/about');
    });

    it('should create submenu for nested routes', () => {
      const routes = [
        { path: '/menu', title: 'Menu' },
        { path: '/menu/sub', title: 'Sub Menu' },
      ];
      const result = extractMenuStructure(routes as any);
      const menu = result.find((m) => m.path === '/menu');
      expect(menu).toBeDefined();
      expect(menu?.subMenu).toHaveLength(1);
      expect(menu?.subMenu?.[0].path).toBe('/menu/sub');
    });

    it('should handle multi-level nested routes', () => {
      const routes = [
        { path: '/a', title: 'A' },
        { path: '/a/b', title: 'B' },
        { path: '/a/b/c', title: 'C' },
      ];
      const result = extractMenuStructure(routes as any);
      expect(result).toHaveLength(1);
      const menuA = result.find((m) => m.path === '/a');
      expect(menuA?.subMenu).toHaveLength(1);
    });
  });

  describe('dataRoutes', () => {
    it('should have valid routes structure', () => {
      expect(dataRoutes).toBeDefined();
      expect(Array.isArray(dataRoutes)).toBe(true);
      dataRoutes.forEach((route) => {
        expect(route.path).toBeDefined();
        expect(typeof route.path).toBe('string');
      });
    });

    it('should contain expected route paths', () => {
      const paths = dataRoutes.map((r) => r.path);
      expect(paths).toContain('/');
      expect(paths).toContain('/menu1');
      expect(paths).toContain('/table-list');
    });
  });
});
