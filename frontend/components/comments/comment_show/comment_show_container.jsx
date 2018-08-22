import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getComments } from '../../../actions/comment_actions';
import CommentShow from './comment_show';

const mapStateToProps = (state, ownProps) => {
  const currentVideoId = ownProps.match.params.videoId;
  const currentVideo = state.entities.videos[currentVideoId];

  return {
    currentVideoId: currentVideoId,
    commentIds: currentVideo ? currentVideo.comment_ids : []
  };
};

const mapDispatchToProps = dispatch => ({
  getComments: (videoId, parentCommentId) => dispatch(getComments(videoId, parentCommentId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentShow));
