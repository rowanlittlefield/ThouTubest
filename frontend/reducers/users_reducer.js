import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_VIDEOS, RECEIVE_VIDEO } from '../actions/video_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_LIKE } from '../actions/like_actions';

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
      case REMOVE_COMMENT:
      return merge({}, state, { [action.user.id]: action.user});
    case RECEIVE_LIKE:
      // const newState = merge({}, state);
      // if (action.like.likeable_type === 'Video' &&
      //   state[action.like.user_id].liked_video_ids) {
      //   newState[action.like.user_id].liked_video_ids.push(action.like.likeable_id);
      // } else {
      //
      // }
      const newState = merge({}, state, {[action.user.id]: action.user});


      return newState
    default:
      return state;
  }
};

export default usersReducer;
