import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/store';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'react-toastify/dist/ReactToastify.css';

let persistor = persistStore(store);

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
);
