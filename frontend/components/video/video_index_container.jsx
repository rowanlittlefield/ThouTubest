import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getVideos } from '../../actions/video_actions';
import VideoIndex from './video_index';

const mapStateToProps = (state, ownProps) => {
  return {
  videoIds: Object.values(state.entities.videos).map(video => video.id)
  }
};

const mapDispatchToProps = dispatch => ({
  getVideos: () => dispatch(getVideos())
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
