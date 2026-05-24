import dayjs from 'dayjs';

export const success = (data: any, ret = 0, msg = 'ok') => ({
  data,
  ret,
  msg,
  timestamp: dayjs().unix(),
});

export const fail = (msg: string, ret = 1) => ({
  data: null,
  ret,
  msg,
  timestamp: dayjs().unix(),
});

export const parseJson = (obj?: string) => {
  if (!obj) {
    return undefined;
  }
  try {
    return JSON.parse(obj);
  } catch {
    // Silently fail and return undefined for invalid JSON
    return undefined;
  }
};

export function sequence<T>(list: (() => Promise<T>)[]) {
  let queue = Promise.resolve<T[]>([]);
  const res: T[] = [];

  list.forEach((item) => {
    queue = queue.then(item).then((data) => {
      res.push(data);
      return res;
    });
  });
  return queue;
}
