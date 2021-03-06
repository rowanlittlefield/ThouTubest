import {
  RECEIVE_VIDEO,
  RECEIVE_VIDEOS,
  REMOVE_VIDEO
} from '../../actions/video_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comment_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../../actions/like_actions';
import { RECEIVE_SEARCH_RESULTS, RECEIVE_AUTOCOMPLETE_RESULTS } from '../../actions/search_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_VIDEO:
    case RECEIVE_VIDEOS:
    return merge({}, state, action.videos);
    case RECEIVE_COMMENT:
    case REMOVE_COMMENT:
      const newState = merge({}, state);
      const newerState = merge(newState, {[action.video.id]: action.video})
        newerState[action.video.id].comment_ids = action.video.comment_ids.slice();
      return newerState;
    case REMOVE_VIDEO:
      const stateDup = merge({}, state);
      delete stateDup[action.id];
      return stateDup
    case RECEIVE_LIKE:
    case REMOVE_LIKE:
    const theStateDup = merge({}, state, {[action.video.id]: action.video});
      return theStateDup;
    case RECEIVE_SEARCH_RESULTS:
    case RECEIVE_AUTOCOMPLETE_RESULTS:
      return merge({}, state, action.results.results);
    default:
      return state;

  }
};

export default videosReducer;
