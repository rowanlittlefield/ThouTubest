import * as APIUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';


export const receiveVideo = ({video, user}) => ({
  type: RECEIVE_VIDEO,
  video,
  user
});

export const receiveVideos = ({videos, videoList, users}) => ({
  type: RECEIVE_VIDEOS,
  videos,
  videoList,
  users
});

export const removeVideo = video => ({
  type: REMOVE_VIDEO,
  id: video.id
})

export const receiveErrors = errors => ({
  type: RECEIVE_VIDEO_ERRORS,
  errors
});

export const getVideo = id => dispatch => (
  APIUtil.getVideo(id).then(payload => (
    dispatch(receiveVideo(payload))
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

export const deleteVideo = id => dispatch => (
  APIUtil.deleteVideo(id).then(video => (
    dispatch(removeVideo(video))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const updateVideo = video => dispatch => (
  APIUtil.updateVideo(video).then(video => (
    dispatch(receiveVideo(video))
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
