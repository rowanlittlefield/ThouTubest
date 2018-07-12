import * as APIUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS';

export const receiveVideo = video => ({
  type: RECEIVE_VIDEO,
  video
});

export const receiveErrors = errors => ({
  type: RECEIVE_VIDEO_ERRORS,
  errors
})

export const getVideo = id => dispatch => (
  APIUtil.getVideo(id).then(user => (
    dispatch(receiveVideo(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);
