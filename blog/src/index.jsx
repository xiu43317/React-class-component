import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import App from './components/App';
import { Provider } from 'react-redux'
import AppReducer from './reducer/reducer';
import { createStore } from 'redux';

// 建立 store，把 reducer 傳進去
let store = createStore(AppReducer);

//import './index.css';
ReactDOM.render(
  (
    <div>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </div>
  ),
  document.getElementById('root')
);

window.store = store;