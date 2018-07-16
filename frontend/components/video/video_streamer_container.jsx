import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getVideo } from '../../actions/video_actions';
import VideoStreamer from './video_streamer';

const mapStateToProps = (state, ownProps) => {
  return {
  video: state.entities.videos[state.ui.currentVideo]
  };
};

const mapDispatchToProps = dispatch => ({
  getVideo: id => dispatch(getVideo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoStreamer);
