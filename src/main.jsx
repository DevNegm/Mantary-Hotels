import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index.jsx'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "@mantine/dates/styles.css";
import './index.css'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
        <Toaster position="top-center"/>
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
