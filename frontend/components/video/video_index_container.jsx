import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getVideos } from '../../actions/video_actions';
import VideoIndex from './video_index';

const mapStateToProps = (state, ownProps) => {
  
  return {
  videos: state.entities.videos,
  videoList: state.ui.videoList,
  users: state.entities.users
  }
};

const mapDispatchToProps = dispatch => ({
  getVideos: () => dispatch(getVideos())
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
