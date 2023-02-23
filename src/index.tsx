import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './Router';
import {RouterProvider} from "react-router-dom";
import { QueryClientProvider,QueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient=new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
