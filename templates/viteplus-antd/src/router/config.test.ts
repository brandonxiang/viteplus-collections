import { describe, it, expect } from 'vite-plus/test';
import { getDataRoutes, getMenusFromDataRoutes } from '@/router/config';

describe('router/config', () => {
  describe('getDataRoutes', () => {
    it('should return data routes', () => {
      const routes = getDataRoutes();
      expect(routes).toBeDefined();
      expect(Array.isArray(routes)).toBe(true);
      expect(routes.length).toBeGreaterThan(0);
    });

    it('should contain expected routes', () => {
      const routes = getDataRoutes();
      const paths = routes.map((r) => r.path);
      expect(paths).toContain('/');
      expect(paths).toContain('/menu1');
      expect(paths).toContain('/table-list');
      expect(paths).toContain('/dashboard');
    });
  });

  describe('getMenusFromDataRoutes', () => {
    it('should return menu structure', () => {
      const menus = getMenusFromDataRoutes();
      expect(menus).toBeDefined();
      expect(Array.isArray(menus)).toBe(true);
      expect(menus.length).toBeGreaterThan(0);
    });

    it('should include root path in menus', () => {
      const menus = getMenusFromDataRoutes();
      const paths = menus.map((m) => m.path);
      expect(paths).toContain('/');
    });
  });
});
