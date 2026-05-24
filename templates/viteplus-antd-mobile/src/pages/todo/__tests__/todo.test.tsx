import type { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import Todo from '../index';

const navigationState = { state: 'idle' as 'idle' | 'submitting' };

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    Form: ({ children, ...props }: ComponentProps<'form'>) => <form {...props}>{children}</form>,
    useLoaderData: () => ({
      todos: [
        { id: 1, text: 'buy milk', completed: false },
        { id: 2, text: 'write tests', completed: true },
      ],
    }),
    useNavigation: () => ({ state: navigationState.state }),
  };
});

describe('Todo page', () => {
  beforeEach(() => {
    navigationState.state = 'idle';
  });

  it('renders todos from loader data', () => {
    render(<Todo />);

    expect(screen.getByText('buy milk')).toBeTruthy();
    expect(screen.getByText('write tests')).toBeTruthy();
    expect(screen.getByText('✓')).toBeTruthy();
  });

  it('disables submit button and shows submitting text while posting', () => {
    navigationState.state = 'submitting';
    render(<Todo />);

    expect((screen.getByRole('button', { name: 'Adding...' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});
