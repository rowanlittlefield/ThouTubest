import { connect } from 'react-redux';
import React from 'react';
import { getVideos } from '../../../actions/video_actions';
import VideoIndex from './video_index';
import { groupVideoKeysIntoFives } from '../../../reducers/selectors/video_selectors';

const mapStateToProps = ({ entities }, ownProps) => {
  return {
  // videoIds: Object.values(entities.videos).map(video => video.id)
  videoIdsByList: groupVideoKeysIntoFives(entities.videos)
  }
};

const mapDispatchToProps = dispatch => ({
  getVideos: (limit, offset) => dispatch(getVideos(limit, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
