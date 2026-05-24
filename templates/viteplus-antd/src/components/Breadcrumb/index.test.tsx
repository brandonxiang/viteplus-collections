import { describe, it, expect } from 'vite-plus/test';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { BreadcrumbView } from './index';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('components/Breadcrumb', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<BreadcrumbView />);
    expect(container).toBeInTheDocument();
  });

  it('should render breadcrumb items', () => {
    renderWithRouter(<BreadcrumbView />);
    const breadcrumb = document.querySelector('.ant-breadcrumb');
    expect(breadcrumb).toBeInTheDocument();
  });

  it('should handle root path', () => {
    window.history.pushState({}, '', '/');
    const { container } = renderWithRouter(<BreadcrumbView />);
    expect(container).toBeInTheDocument();
  });

  it('should handle nested path', () => {
    window.history.pushState({}, '', '/menu1/submenu1');
    const { container } = renderWithRouter(<BreadcrumbView />);
    expect(container).toBeInTheDocument();
  });
});
