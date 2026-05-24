import { describe, it, expect } from 'vite-plus/test';
import { render, screen } from '@testing-library/react';
import { PageLoading } from './index';

describe('components/PageLoading', () => {
  it('should render loading indicator', () => {
    render(<PageLoading />);
    const spinner = document.querySelector('.ant-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should have aria-busy attribute', () => {
    render(<PageLoading />);
    const spinner = document.querySelector('.ant-spin');
    expect(spinner).toHaveAttribute('aria-busy', 'true');
  });

  it('should apply custom tip', () => {
    render(<PageLoading tip="Custom loading..." />);
    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });
});
