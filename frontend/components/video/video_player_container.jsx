import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getVideo, getVideos, deleteVideo } from '../../actions/video_actions';
import VideoPlayer from './video_player';

const mapStateToProps = (state, ownProps) => {
  const video = state.entities.videos[ownProps.match.params.videoId];

  return {
  video: video,
  user: video ? state.entities.users[video.uploader_id] : {},
  videoIds: Object.values(state.entities.videos).map(video => video.id),
  currentUserId: state.session.id
  };
};

const mapDispatchToProps = dispatch => ({
  getVideo: id => dispatch(getVideo(id)),
  getVideos: () => dispatch(getVideos()),
  deleteVideo: id => dispatch(deleteVideo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
