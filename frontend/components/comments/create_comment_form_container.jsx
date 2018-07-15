import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { createComment } from '../../actions/comment_actions';
import CreateCommentForm from './create_comment_form';

const mapStateToProps = (state, ownProps) => {
  return {
  errors: state.errors.comments,
  currentVideoId: state.ui.currentVideo,
  currentUserId: state.session.id
  };
};

const mapDispatchToProps = dispatch => ({
  processForm: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm);
