import IORedis, { RedisKey } from 'ioredis';
import { config } from '../config/index.js';

function initRedis() {
  const redisOptions: any = {
    host: config.redis.host,
    port: config.redis.port,
  };

  if (config.redis.password) {
    redisOptions.password = config.redis.password;
  }

  return new IORedis(redisOptions);
}

const redis = initRedis();

export async function hget(key: string, filed: string) {
  return redis.hget(key, filed);
}

export async function hmget(key: RedisKey, ...fields: string[]) {
  return redis.hmget(key, ...fields);
}

export async function hgetall(key: string) {
  return redis.hgetall(key);
}

export function hset(key: string, filed: string, value: string | Record<string, any>) {
  return redis.hset(key, filed, typeof value === 'string' ? value : JSON.stringify(value));
}

export function hmset(key: string, sets: Record<string, string | Record<string, any>>) {
  const args = Object.keys(sets).reduce((prev: string[], k: string) => {
    const value = sets[k];
    prev.push(k, typeof value === 'string' ? value : JSON.stringify(value));
    return prev;
  }, []);

  if (args.length) {
    return redis.hmset(key, ...args);
  }
  return Promise.resolve('OK');
}

export async function hkeys(key: string) {
  return redis.hkeys(key);
}

export function hdel(key: string, fields: string[]) {
  if (fields.length) {
    return redis.hdel(key, ...fields);
  }
  return Promise.resolve(0);
}

export async function setex(
  key: string,
  seconds: number,
  value: string | Record<string, any> | Buffer,
) {
  return redis.setex(key, seconds, typeof value === 'string' ? value : JSON.stringify(value));
}

export async function getex(key: string) {
  return redis.get(key); // 集群redis 不支持 getex
}

export async function getKeys(pattern: string) {
  return redis.keys(pattern);
}

export async function delKeys(keys: string[]) {
  return redis.del(keys);
}

export function get(key: string) {
  return redis.get(key);
}
export function set(key: string, value: string) {
  return redis.set(key, value);
}
