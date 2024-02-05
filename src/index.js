import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/js/dist/modal"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { store } from './Shared/Redux/store.js';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Shared/Redux/store";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

