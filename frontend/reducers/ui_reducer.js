import {
  RECEIVE_VIDEO,
   // LEAVE_CURRENT_VIDEO,
  RECEIVE_VIDEOS
} from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
    // debugger
    //   const newState = merge({}, state, {currentVideo: action.video.id});
    //   return newState;
    return state;
    case RECEIVE_VIDEOS:
      const otherNewState = merge({}, state, {videoList: action.videoList});
      return otherNewState;
    default:
      return state;
  }
};
