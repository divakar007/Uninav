import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ClerkProvider} from "@clerk/clerk-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {What3WordsProvider} from "./components/context/What3WordsContext";


const REACT_CLERK_API_KEY = process.env.REACT_APP_CLERK_API_KEY;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <ClerkProvider publishableKey={REACT_CLERK_API_KEY || ''} afterSignOutUrl={"/"}>
          <What3WordsProvider>
            <App />
          </What3WordsProvider>
      </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
