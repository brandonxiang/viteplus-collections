import { describe, it, expect, vi, beforeEach } from 'vite-plus/test';
import { success, fail, parseJson, sequence } from './index.js';

describe('Utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  describe('success', () => {
    it('should return success response with default values', () => {
      const data = { id: 1, name: 'Test' };
      const result = success(data);

      expect(result).toEqual({
        data,
        ret: 0,
        msg: 'ok',
        timestamp: expect.any(Number),
      });
    });

    it('should allow custom ret and msg', () => {
      const data = { id: 1 };
      const result = success(data, 200, 'Success!');

      expect(result).toEqual({
        data,
        ret: 200,
        msg: 'Success!',
        timestamp: expect.any(Number),
      });
    });
  });

  describe('fail', () => {
    it('should return fail response with default ret', () => {
      const result = fail('Error occurred');

      expect(result).toEqual({
        data: null,
        ret: 1,
        msg: 'Error occurred',
        timestamp: expect.any(Number),
      });
    });

    it('should allow custom ret value', () => {
      const result = fail('Not found', 404);

      expect(result).toEqual({
        data: null,
        ret: 404,
        msg: 'Not found',
        timestamp: expect.any(Number),
      });
    });
  });

  describe('parseJson', () => {
    it('should parse valid JSON string', () => {
      const jsonString = '{"name":"John","age":30}';
      const result = parseJson(jsonString);

      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('should return undefined for invalid JSON', () => {
      const invalidJson = '{invalid json}';
      const result = parseJson(invalidJson);

      expect(result).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const result = parseJson('');

      expect(result).toBeUndefined();
    });

    it('should return undefined when no argument provided', () => {
      const result = parseJson();

      expect(result).toBeUndefined();
    });
  });

  describe('sequence', () => {
    it('should execute promises sequentially', async () => {
      const executionOrder: number[] = [];

      const task1 = () => {
        executionOrder.push(1);
        return Promise.resolve(1);
      };

      const task2 = () => {
        executionOrder.push(2);
        return Promise.resolve(2);
      };

      const task3 = () => {
        executionOrder.push(3);
        return Promise.resolve(3);
      };

      const result = await sequence([task1, task2, task3]);

      expect(result).toEqual([1, 2, 3]);
      expect(executionOrder).toEqual([1, 2, 3]); // Executed in order
    });

    it('should handle empty array', async () => {
      const result = await sequence([]);
      expect(result).toEqual([]);
    });

    it('should handle single promise', async () => {
      const task = () => Promise.resolve(42);
      const result = await sequence([task]);
      expect(result).toEqual([42]);
    });
  });
});
