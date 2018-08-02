import * as APIUtil from '../util/like_api_util';

export const RECEIVE_LIKE_ERRORS = 'RECEIVE_LIKE_ERRORS';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';

export const receiveErrors = errors => ({
  type: RECEIVE_LIKE_ERRORS,
  errors
});

export const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});


export const createVideoLike = (currentUserId, videoId, isDislike) => dispatch => {
  return APIUtil.createVideoLike(currentUserId, videoId, isDislike).then(like => {
    dispatch(receiveLike(like))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};
