import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/main.scss';
import App from './App';
import { Provider } from 'react-redux'; 
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
);