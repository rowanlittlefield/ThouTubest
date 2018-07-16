import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getVideo, getVideos } from '../../actions/video_actions';
import VideoPlayer from './video_player';

const mapStateToProps = (state, ownProps) => {
  return {
  video: state.entities[ownProps.match.params.videoId],
  videoIds: Object.values(state.entities.videos).map(video => video.id)
  };
};

const mapDispatchToProps = dispatch => ({
  getVideo: id => dispatch(getVideo(id)),
  getVideos: () => dispatch(getVideos())
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
