import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_VIDEOS, RECEIVE_VIDEO } from '../../actions/video_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comment_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../../actions/like_actions';
import { RECEIVE_SEARCH_RESULTS } from '../../actions/search_actions';

const usersReducer = (state = {}, action) => {

  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_VIDEOS:
    case RECEIVE_VIDEO:
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, state, action.users);
      case RECEIVE_COMMENT:
      case REMOVE_COMMENT:
      return merge({}, state, { [action.user.id]: action.user});
    case RECEIVE_LIKE:
    case REMOVE_LIKE:
      const newState = merge({}, state);
      const newerState = merge (newState, {[action.user.id]: action.user});
      newerState[action.user.id].like_ids = action.user.like_ids.slice();
      return newerState
    default:
      return state;
  }
};

export default usersReducer;
