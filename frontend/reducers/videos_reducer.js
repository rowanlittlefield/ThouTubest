import {
  RECEIVE_VIDEO
} from '../actions/video_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      const newState = merge({}, state, {[action.video.id]: action.video})
      return newState;
    default:
      return state;

  }
};

export default videosReducer;
