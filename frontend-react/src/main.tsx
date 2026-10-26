import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './styles/index.scss';

import App from './App.tsx';
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';
import Feed from './components/Feed.tsx';
import AddPost from './components/AddPost.tsx';
import { AuthProvider } from './components/Auth.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Feed />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="add" element={<AddPost />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
