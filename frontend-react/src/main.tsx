import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './styles/index.scss';

import { AuthProvider, TOKEN_KEY } from './components/context/Auth.tsx';
import { getPost } from './services/posts.services.ts';
import { getUserID as getUser } from './services/user.service.ts';
import App from './App.tsx';
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';
import Feed from './components/Feed.tsx';
import AddPost from './components/AddPost.tsx';
import EditPost from './components/EditPost.tsx';
import ProtectedRoutes from './components/ProtectedRoutes.tsx';
import PublicOnlyRoutes from './components/PublicOnlyRoutes.tsx';
import SubmitAction from './components/context/SubmitAction.tsx';
import RefreshAction from './components/context/refreshAction.tsx';
import BrowserStorage from './utils/storage.ts';
import LoadingAction from './components/context/LoadingAction.tsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        loader: async () => {
          if (BrowserStorage.get(TOKEN_KEY)) {
            return await getUser();
          }
          return true;
        },
        element: <Feed />,
      },

      // For logged users only
      {
        element: <ProtectedRoutes />,
        children: [
          { path: 'add', element: <AddPost /> },
          { path: 'edit/:id', loader: ({ params }) => getPost(Number(params.id)), element: <EditPost /> },
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
      <SubmitAction>
        <RefreshAction>
          <LoadingAction>
            <RouterProvider router={router} />
          </LoadingAction>
        </RefreshAction>
      </SubmitAction>
    </AuthProvider>
  </StrictMode>,
);
