import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const createBrowserRouterSpy = vi.fn((config: unknown) => config);

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    createBrowserRouter: createBrowserRouterSpy,
    useRouteError: () => new Error('mocked route error'),
  };
});

describe('router config', () => {
  beforeEach(() => {
    createBrowserRouterSpy.mockClear();
  });

  it('registers required child routes', async () => {
    vi.resetModules();
    await import('../index');

    expect(createBrowserRouterSpy).toHaveBeenCalledTimes(1);

    const [config] = createBrowserRouterSpy.mock.calls[0] as [Array<Record<string, unknown>>];
    const rootRoute = config[0];
    const children = rootRoute.children as Array<Record<string, unknown>>;
    const pathSet = new Set(children.map((item) => item.path).filter(Boolean));

    expect(rootRoute.path).toBe('/');
    expect(pathSet).toEqual(new Set(['home', 'todo', 'message', 'me']));
  });

  it('keeps todo route loader and action for data mode', async () => {
    vi.resetModules();
    await import('../index');

    const [config] = createBrowserRouterSpy.mock.calls[0] as [Array<Record<string, unknown>>];
    const rootRoute = config[0];
    const children = rootRoute.children as Array<Record<string, unknown>>;
    const todoRoute = children.find((item) => item.path === 'todo');

    expect(typeof todoRoute?.loader).toBe('function');
    expect(typeof todoRoute?.action).toBe('function');
  });
});
