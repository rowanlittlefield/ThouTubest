import * as APIUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS';

export const receiveVideo = video => ({
  type: RECEIVE_VIDEO,
  video
});

export const receiveVideos = ({videos, videoList}) => ({
  type: RECEIVE_VIDEOS,
  videos,
  videoList
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

export const getVideos = () => dispatch => (
  APIUtil.getVideos().then(payload => (
    dispatch(receiveVideos(payload))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const clearErrors = () => dispatch => {
  return dispatch(receiveErrors([]));
};

export const dispatchErrors = errors => dispatch => {
  return dispatch(receiveErrors(errors));
};
