import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import Layout from '../layout';
import { useRouteError } from 'react-router';

// Lazy load page components
const Home = lazy(() => import('../pages/home'));
const Todo = lazy(() => import('../pages/todo'));
const Message = lazy(() => import('../pages/message'));
const PersonalCenter = lazy(() => import('../pages/personal-center'));

// Generic Error Boundary Component
function ErrorBoundary() {
  const error = useRouteError();
  console.error('Route error:', error);

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        color: '#d32f2f',
      }}
    >
      <h2>Oops! Something went wrong</h2>
      <p>{error instanceof Error ? error.message : 'An unexpected error occurred'}</p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reload Page
      </button>
    </div>
  );
}

// Example loader functions - you can add actual data fetching logic here
const homeLoader = async () => {
  // Example: return fetch('/api/home').then(res => res.json());
  return { message: 'Welcome to Home Page!' };
};

const todoLoader = async () => {
  // Example: return fetch('/api/todos').then(res => res.json());
  return {
    todos: [
      { id: 1, text: 'Learn React Router v7', completed: false },
      { id: 2, text: 'Implement data mode', completed: true },
    ],
  };
};

const messageLoader = async () => {
  // Example: return fetch('/api/messages').then(res => res.json());
  return {
    messages: [{ id: 1, from: 'System', text: 'Welcome to the app!', timestamp: new Date() }],
  };
};

const personalCenterLoader = async () => {
  // Example: return fetch('/api/profile').then(res => res.json());
  return {
    user: {
      name: 'User',
      email: 'user@example.com',
      avatar: '/default-avatar.png',
    },
  };
};

// Example action function for handling form submissions
const todoAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'add') {
    const text = formData.get('text');
    // Example: await fetch('/api/todos', { method: 'POST', body: JSON.stringify({ text }) });
    console.log('Adding todo:', text);
  }

  return { success: true };
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'home',
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'todo',
        element: <Todo />,
        loader: todoLoader,
        action: todoAction,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'message',
        element: <Message />,
        loader: messageLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'me',
        element: <PersonalCenter />,
        loader: personalCenterLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        // Default redirect to home
        index: true,
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);
