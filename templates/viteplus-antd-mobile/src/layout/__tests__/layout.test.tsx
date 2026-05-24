import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import Layout from '../index';

const navigateSpy = vi.fn();
const locationState = { pathname: '/home' };

const tabBarCapture = vi.fn();

vi.mock('antd-mobile', () => {
  const TabBar = ({
    activeKey,
    onChange,
    children,
  }: {
    activeKey: string;
    onChange: (key: string) => void;
    children: ReactNode;
  }) => {
    tabBarCapture({ activeKey });
    return (
      <div data-testid="tabbar" data-active-key={activeKey}>
        {children}
        <button type="button" onClick={() => onChange('/todo')}>
          trigger-tab-change
        </button>
      </div>
    );
  };

  TabBar.Item = ({ title }: { title: ReactNode }) => <div>{title}</div>;

  const NavBar = ({ onBack, children }: { onBack: () => void; children: ReactNode }) => (
    <div>
      <button type="button" onClick={onBack}>
        nav-back
      </button>
      <span>{children}</span>
    </div>
  );

  return { TabBar, NavBar };
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
    useNavigate: () => navigateSpy,
    useLocation: () => ({ pathname: locationState.pathname }),
  };
});

describe('Layout', () => {
  beforeEach(() => {
    navigateSpy.mockReset();
    tabBarCapture.mockReset();
    locationState.pathname = '/home';
  });

  it('renders current pathname as active tab key', () => {
    locationState.pathname = '/message';
    render(<Layout />);

    expect(screen.getByTestId('tabbar').getAttribute('data-active-key')).toBe('/message');
    expect(tabBarCapture).toHaveBeenCalledWith({ activeKey: '/message' });
  });

  it('navigates when tab changes', () => {
    render(<Layout />);

    fireEvent.click(screen.getByRole('button', { name: 'trigger-tab-change' }));

    expect(navigateSpy).toHaveBeenCalledWith('/todo');
  });

  it('navigates back when header back button is clicked', () => {
    render(<Layout />);

    fireEvent.click(screen.getByRole('button', { name: 'nav-back' }));

    expect(navigateSpy).toHaveBeenCalledWith(-1);
  });
});
