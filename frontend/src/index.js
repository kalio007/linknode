import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// chakra imports 
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { ColorModeScript } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </React.StrictMode>
  </ChakraProvider>
);
