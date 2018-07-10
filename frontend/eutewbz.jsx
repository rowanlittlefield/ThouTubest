import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as SessionActions from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  // window.getState = store.getState;
  // window.login = SessionActions.login;
  // window.dispatch = store.dispatch;

  const root = document.getElementById('root');
  // ReactDOM.render(<h1>Hello World</h1>, root);
  root.innerHTML = 'hello world';
});
// <Root store={ store } />
