import { describe, it, expect, beforeAll, afterAll } from 'vite-plus/test';
import Fastify from 'fastify';
import HelloRouter from './hello.js';

describe('Hello Routes', () => {
  const server = Fastify({
    logger: false,
  });

  beforeAll(async () => {
    await server.register(HelloRouter);
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /world', () => {
    it('should return hello world message', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/world',
      });

      expect(response.statusCode).toBe(200);
      const json = response.json();
      expect(json.data).toEqual({
        msg: 'Hello World!',
        name: 'World',
      });
      expect(json.ret).toBe(0);
      expect(json.msg).toBe('ok');
    });

    it('should return personalized greeting with query param', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/world?name=John',
      });

      expect(response.statusCode).toBe(200);
      const json = response.json();
      expect(json.data).toEqual({
        msg: 'Hello John!',
        name: 'John',
      });
    });

    it('should handle special characters in name', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/world?name=Test%20User',
      });

      expect(response.statusCode).toBe(200);
      const json = response.json();
      expect(json.data.msg).toBe('Hello Test User!');
      expect(json.data.name).toBe('Test User');
    });
  });

  describe('GET /info', () => {
    it('should return service information', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/info',
      });

      expect(response.statusCode).toBe(200);
      const json = response.json();
      expect(json.data).toHaveProperty('service', 'Hello Service');
      expect(json.data).toHaveProperty('version', '1.0.0');
      expect(json.data).toHaveProperty('uptime');
      expect(json.data.uptime).toBeGreaterThan(0);
      expect(json.ret).toBe(0);
    });
  });

  describe('POST /user', () => {
    it('should return user data with default pagination', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/user',
        payload: {
          email: 'user@example.com',
        },
      });

      expect(response.statusCode).toBe(200);
      const json = response.json();
      expect(json).toMatchObject({
        data: {
          message: 'Hello user with email: user@example.com!',
          user: {
            email: 'user@example.com',
            pagination: {
              page: 1,
              size: 10,
              total: 100,
            },
          },
        },
        ret: 0,
        msg: 'ok',
      });
    });

    it('should echo optional request fields and custom pagination', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/user',
        payload: {
          email: 'owner@example.com',
          show_mine: true,
          project_name: 'viteplus-fastify',
          page: 3,
          size: 25,
        },
      });

      expect(response.statusCode).toBe(200);
      const json = response.json();
      expect(json.data.user).toEqual({
        email: 'owner@example.com',
        show_mine: true,
        project_name: 'viteplus-fastify',
        pagination: {
          page: 3,
          size: 25,
          total: 100,
        },
      });
    });

    it('should reject pagination values outside schema limits', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/user',
        payload: {
          email: 'user@example.com',
          page: 0,
          size: 101,
        },
      });

      expect(response.statusCode).toBe(400);
      const json = response.json();
      expect(json.message).toContain('body/page must be >= 1');
    });
  });
});
