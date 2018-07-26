import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { createComment, clearErrors } from '../../actions/comment_actions';
import CreateCommentForm from './create_comment_form';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.id;

  return {
  errors: state.errors.comments,
  currentVideoId: ownProps.match.params.videoId,
  currentUserId: state.session.id,
  currentUser: currentUserId ? state.entities.users[currentUserId] : {},
  type: ownProps.type,
  parentCommentId: ownProps.parentCommentId,
  commentListItem: ownProps.commentListItem
  };
};

const mapDispatchToProps = dispatch => ({
  processForm: comment => dispatch(createComment(comment)),
  clearErrors: () => dispatch(clearErrors())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm));
