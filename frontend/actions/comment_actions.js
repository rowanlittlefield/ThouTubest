import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const receiveErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
})

export const getComments = (videoId, parentCommentId) => dispatch => (
  APIUtil.getComments({videoId, parentCommentId}).then(comments => (
    dispatch(receiveComments(comments))
  ), err => (
    dispatch(recieveErrors(err.responseJSON))
  ))
);

export const createComment = comment => dispatch => (
  APIUtil.createComment(comment).then(comment => (
    dispatch(receiveComment(comment))
  ), err => (
    dispatch(receiveCommentErrors(err.responseJSON))
  ))
);

export const clearErrors = () => dispatch => {
  return dispatch(receiveErrors([]));
};
