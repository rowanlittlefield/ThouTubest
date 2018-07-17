import {
  RECEIVE_VIDEO,
  RECEIVE_VIDEOS,
  REMOVE_VIDEO
} from '../actions/video_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      const newState = merge({}, state, {[action.video.id]: action.video})
      return newState;
    case RECEIVE_VIDEOS:
      let otherNewState = merge({}, state, action.videos);
      return otherNewState;
    case REMOVE_VIDEO:
      const stateDup = merge({}, state);
      delete stateDup[action.id];
      return stateDup
    default:
      return state;

  }
};

export default videosReducer;
