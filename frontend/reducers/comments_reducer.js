import {
  // RECEIVE_VIDEO,
  RECEIVE_COMMENTS
} from '../actions/comment_actions';
import { merge } from 'lodash';

const commentReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    // case RECEIVE_VIDEO:
      // const newState = merge({}, state, {[action.video.id]: action.video})
      // return newState;
    case RECEIVE_COMMENTS:
      let otherNewState = merge({}, state, action.comments);
      return otherNewState;
    default:
      return state;

  }
};

export default commentReducer;
