import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getComments } from '../../actions/comment_actions';
import CommentShow from './comment_show';

const mapStateToProps = (state, ownProps) => {
  const currentVideo = state.entities.videos[state.ui.currentVideo];
  return {
    video: currentVideo,
    commentIds: (currentVideo ? currentVideo.comment_ids : [])
  };
};

const mapDispatchToProps = dispatch => ({
  getComments: (videoId, parentCommentId) => dispatch(getComments(videoId, parentCommentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentShow);
