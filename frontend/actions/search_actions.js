import * as APIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const RECEIVE_SEARCH_ERRORS = 'RECEIVE_SEARCH_ERRORS';

export const receiveSearchResults = results => ({
  type: RECEIVE_SEARCH_RESULTS,
  results
});

export const receiveErrors = errors => ({
  type: RECEIVE_SEARCH_ERRORS,
  errors
});


export const sendSearchQuery = query => dispatch => {
  return APIUtil.search(query).then(results => {
    dispatch(receiveSearchResults(results))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};
