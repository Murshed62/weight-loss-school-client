import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
const queryClient = new QueryClient();
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/router';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
