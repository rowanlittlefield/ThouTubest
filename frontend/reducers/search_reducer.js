import {
  RECEIVE_SEARCH_RESULTS
} from '../actions/search_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
    return merge({}, state, { results: action.type.results });
      return state;
    default:
      return state;
  }
};
