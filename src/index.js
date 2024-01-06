import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './components/UserProvider';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <UserProvider>
    <App />
  </UserProvider>
);