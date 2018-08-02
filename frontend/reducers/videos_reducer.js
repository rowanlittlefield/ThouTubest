import {
  RECEIVE_VIDEO,
  RECEIVE_VIDEOS,
  REMOVE_VIDEO
} from '../actions/video_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_LIKE } from '../actions/like_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_VIDEO:
    return merge({}, state, action.videos);
    case RECEIVE_COMMENT:
    case REMOVE_COMMENT:
      const newState = merge({}, state);
      const newerState = merge(newState, {[action.video.id]: action.video})
        newerState[action.video.id].comment_ids = action.video.comment_ids.slice();
      return newerState;
    case RECEIVE_VIDEOS:
      return merge({}, state, action.videos);
    case REMOVE_VIDEO:
      const stateDup = merge({}, state);
      delete stateDup[action.id];
      return stateDup
    case RECEIVE_LIKE:
    debugger
    const theStateDup = merge({}, state);
      if (action.like && action.like.is_dislike) {
        theStateDup[action.like.likeable_id].num_dislikes++;
      } else {
        theStateDup[action.like.likeable_id].num_likes++;
      }
      return theStateDup;
    default:
      return state;

  }
};

export default videosReducer;
