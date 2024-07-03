import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Online, Offline } from 'react-detect-offline';
import ScrollToTopButtom from './components/ScrollToTopButtom';
import { router } from './routes/Route';
import store from './store/store';
import CheckInternetConnection from './components/CheckInternetConnection';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Online>
        <RouterProvider router={router} />
        <ToastContainer />
        <ScrollToTopButtom />
      </Online>
      <Offline>
        <CheckInternetConnection />
      </Offline>
    </Provider>
  </React.StrictMode>
);
