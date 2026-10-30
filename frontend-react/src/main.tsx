import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './styles/index.scss';

import { AuthProvider } from './components/context/Auth.tsx';
import { getPost } from './services/posts.services.ts';
import App from './App.tsx';
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';
import Feed from './components/Feed.tsx';
import AddPost from './components/AddPost.tsx';
import EditPost from './components/EditPost.tsx';
import ProtectedRoutes from './components/ProtectedRoutes.tsx';
import PublicOnlyRoutes from './components/PublicOnlyRoutes.tsx';
import SubmitProvider from './components/context/SubmitAction.tsx';
import RefreshProvider from './components/context/refreshAction.tsx';
import LoadingProvider from './components/context/LoadingAction.tsx';
import Loader from './components/Loader.tsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Feed />,
      },

      // For logged users only
      {
        element: <ProtectedRoutes />,
        children: [
          { path: 'add', element: <AddPost /> },
          {
            path: 'edit/:id',
            loader: ({ params }) => getPost(Number(params.id)),
            element: <EditPost />,
            hydrateFallbackElement: <Loader />,
          },
        ],
      },

      // For Un-logged users only
      {
        element: <PublicOnlyRoutes />,
        children: [
          { path: 'signup', element: <Signup /> },
          { path: 'login', element: <Login /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SubmitProvider>
        <RefreshProvider>
          <LoadingProvider>
            <RouterProvider router={router} />
          </LoadingProvider>
        </RefreshProvider>
      </SubmitProvider>
    </AuthProvider>
  </StrictMode>,
);
