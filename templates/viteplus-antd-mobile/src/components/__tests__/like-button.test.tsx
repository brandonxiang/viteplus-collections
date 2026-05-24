import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import { LikeButton } from '../like-button';

const submitSpy = vi.fn();
const fetcherState = { state: 'idle' as 'idle' | 'submitting' };

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useFetcher: () => ({
      submit: submitSpy,
      state: fetcherState.state,
    }),
  };
});

describe('LikeButton', () => {
  beforeEach(() => {
    submitSpy.mockReset();
    fetcherState.state = 'idle';
  });

  it('optimistically increments likes and submits like action on click', () => {
    render(<LikeButton itemId="todo-1" initialLikes={1} />);

    fireEvent.click(screen.getByRole('button', { name: '👍 1' }));

    expect(screen.getByRole('button', { name: '👍 2' })).toBeTruthy();
    expect(submitSpy).toHaveBeenCalledWith(
      {
        action: 'like',
        itemId: 'todo-1',
        liked: 'true',
      },
      {
        method: 'post',
        action: '/api/like',
      },
    );
  });

  it('shows submitting state and disables button', () => {
    fetcherState.state = 'submitting';

    render(<LikeButton itemId="todo-2" initialLikes={3} />);

    expect((screen.getByRole('button', { name: 'Liking...' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});
