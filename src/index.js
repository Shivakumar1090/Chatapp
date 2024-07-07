import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

// store
import { Provider } from 'react-redux';
import { store } from './redux/store';

//React router dom
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes/router';

//Mui Themes
import { ThemeProvider } from '@emotion/react';
import theme from './utils/theme';

//React toast 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <ThemeProvider theme={theme} initial={false}>
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={AppRouter}/>
      </Provider>
    </React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
    />
  </ThemeProvider>
);

