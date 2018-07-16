import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS
} from '../actions/comment_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';

const commentReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT:
      const newState = merge({}, state, {[action.comment.id]: action.comment})
      return newState;
    case RECEIVE_COMMENTS:
      let otherNewState = merge({}, state, action.comments);
      return otherNewState;
    default:
      return state;

  }
};

export default commentReducer;
