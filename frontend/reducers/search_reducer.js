import {
  RECEIVE_SEARCH_RESULTS
} from '../actions/search_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
    let results;
    if (action.results && Object.values(action.results).length > 0) {
      results = Object.values(action.results.results).map((el, idx) => el.id)
    } else {
      results = [];
    }
      return ({results});
    default:
      return state;
  }
};
