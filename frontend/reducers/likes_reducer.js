import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions'
import { RECEIVE_LIKE } from '../actions/like_actions';

const likesReducer = (state = {}, action) => {

  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
    debugger
      return merge({}, state, action.likes)
    case RECEIVE_LIKE:
    debugger
      return merge({}, state, {[action.like.id]: action.like})
    case RECEIVE_VIDEO:
    debugger
      return merge({}, state, (action.likes ? action.likes : {}));
    default:
      return state;
  }
};

export default likesReducer;
