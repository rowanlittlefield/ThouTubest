import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createComment } from '../../actions/comment_actions';
import CreateCommentForm from './create_comment_form';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.id;

  debugger
  return {
  errors: state.errors.comments,
  currentVideoId: ownProps.match.params.videoId,
  currentUserId: state.session.id,
  currentUser: currentUserId ? state.entities.users[currentUserId] : {}
  };
};

const mapDispatchToProps = dispatch => ({
  processForm: comment => dispatch(createComment(comment))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm));
