import * as APIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const RECEIVE_AUTOCOMPLETE_RESULTS = 'RECEIVE_AUTOCOMPLETE_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const RECEIVE_SEARCH_ERRORS = 'RECEIVE_SEARCH_ERRORS';

export const receiveSearchResults = results => ({
  type: RECEIVE_SEARCH_RESULTS,
  results,
  users: results.users
});

export const receiveAutocompleteResults = results => ({
  type: RECEIVE_AUTOCOMPLETE_RESULTS,
  results,
  users: results.users
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
  results: {}
});

export const receiveErrors = errors => ({
  type: RECEIVE_SEARCH_ERRORS,
  errors
});

export const fetchAutocompleteResults = query => dispatch => {
  return APIUtil.search(query).then(results => {
    dispatch(receiveAutocompleteResults(results))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};

export const sendSearchQuery = query => dispatch => {
  return APIUtil.search(query).then(results => {
    dispatch(receiveSearchResults(results))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};
