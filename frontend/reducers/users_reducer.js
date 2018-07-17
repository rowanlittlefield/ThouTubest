import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_VIDEOS, RECEIVE_VIDEO } from '../actions/video_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';

const usersReducer = (state = {}, action) => {

  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_VIDEOS:
      return merge({}, state, action.users);
    case RECEIVE_VIDEO:
      return merge({}, state, action.users);
      case RECEIVE_COMMENT:
      return merge({}, state, action.user);
    default:
      return state;
  }
};

export default usersReducer;
