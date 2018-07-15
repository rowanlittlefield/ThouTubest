import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getComments } from '../../actions/comment_actions';
import CommentShow from './comment_show';

const mapStateToProps = (state, ownProps) => {
  return {
    video: state.entities.videos[state.ui.currentVideo],
  };
};

const mapDispatchToProps = dispatch => ({
  getComments: (videoId, parentCommentId) => dispatch(getComments(videoId, parentCommentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentShow);
