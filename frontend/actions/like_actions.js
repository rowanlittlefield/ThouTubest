import * as APIUtil from '../util/like_api_util';

export const RECEIVE_LIKE_ERRORS = 'RECEIVE_LIKE_ERRORS';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE_ERROR = 'REMOVE_LIKE_ERROR';
export const REMOVE_LIKE = 'REMOVE_LIKE';

export const receiveErrors = errors => ({
  type: RECEIVE_LIKE_ERRORS,
  errors
});

export const receiveLike = ({like, video, user}) => ({
  type: RECEIVE_LIKE,
  like,
  video,
  user
});

export const removeLike = ({like, video, user}) => ({
  type: REMOVE_LIKE,
  like,
  video,
  user
});


export const createVideoLike = (currentUserId, videoId, isDislike) => dispatch => {
  return APIUtil.createVideoLike(currentUserId, videoId, isDislike).then(payload => {
    dispatch(receiveLike(payload))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};

export const updateLike = (id, is_dislike) => dispatch => {
  return APIUtil.updateLike(id, is_dislike).then(payload => {
    dispatch(receiveLike(payload))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};

export const deleteLike = id => dispatch => {
  return APIUtil.deleteLike(id).then(payload => {
    dispatch(removeLike(payload))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};
