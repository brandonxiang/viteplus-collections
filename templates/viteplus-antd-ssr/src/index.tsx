import * as ReactDOMClient from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from '@/router';
import './index.scss';

const rootElement = document.getElementById('root');

const root = ReactDOMClient.createRoot(rootElement!);
root.render(<RouterProvider router={router} />);
