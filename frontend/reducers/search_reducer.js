import {
  RECEIVE_SEARCH_RESULTS,
  RECEIVE_AUTOCOMPLETE_RESULTS
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
    case RECEIVE_AUTOCOMPLETE_RESULTS:
      let autocomplete;
      if (action.results && Object.values(action.results).length > 0) {
        autocomplete = Object.values(action.results.results).map((el, idx) => el.id)
      } else {
        autocomplete = [];
      }
      return (merge({}, state, {autocomplete}));
    default:
      return state;
  }
};
