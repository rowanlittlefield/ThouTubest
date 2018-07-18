import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { updateComment } from '../../actions/comment_actions';
import EditCommentForm from './edit_comment_form';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.id;
  
  return {
  errors: state.errors.comments,
  currentVideoId: ownProps.match.params.videoId,
  currentUserId: state.session.id,
  currentUser: currentUserId ? state.entities.users[currentUserId] : {},
  type: 'edit',
  parentCommentId: ownProps.comment.parentCommentId
  };
};

const mapDispatchToProps = dispatch => ({
  processForm: comment => dispatch(updateComment(comment))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCommentForm));
