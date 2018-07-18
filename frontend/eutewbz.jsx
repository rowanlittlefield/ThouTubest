import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as SessionActions from './actions/session_actions';
import * as VideoApiUtil from './util/video_api_util';
import * as CommentApiUtil from './util/comment_api_util';
import * as CommentActions from './actions/comment_actions';
import * as VideoActions from './actions/video_actions';


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.dispatch = store.dispatch;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});

window.createVideo = VideoApiUtil.createVideo;
window.getComments = CommentActions.getComments;
window.updateVideo = VideoActions.updateVideo;
