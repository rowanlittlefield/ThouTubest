import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  REMOVE_COMMENT
} from '../actions/comment_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';

const commentReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT:
      let newState = merge({}, state, {[action.comment.id]: action.comment})

      if (action.parentComment) {
        const newerState = merge(newState, {[action.parentComment.id]: action.parentComment})
        newerState[action.comment.parent_comment_id].child_comment_ids = action.parentComment.child_comment_ids.slice();
        return newerState
      }
      return newState;
    case RECEIVE_COMMENTS:
      let otherNewState = merge({}, state, action.comments);
      return otherNewState;
    case REMOVE_COMMENT:
      const stateDup = merge({}, state);
      delete stateDup[action.comment.id];
      return stateDup;
    default:
      return state;

  }
};

export default commentReducer;
