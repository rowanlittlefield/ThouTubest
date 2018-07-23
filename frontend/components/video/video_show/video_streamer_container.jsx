import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getVideo } from '../../../actions/video_actions';
import VideoStreamer from './video_streamer';

const mapStateToProps = (state, ownProps) => {

  return {
  video: state.entities.videos[ownProps.match.params.videoId]
  };
};

const mapDispatchToProps = dispatch => ({
  getVideo: id => dispatch(getVideo(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoStreamer));
