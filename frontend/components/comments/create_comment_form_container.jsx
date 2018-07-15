import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { createComment } from '../../actions/comment_actions';
import CreateCommentForm from './create_comment_form';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.comments,
  currentVideoId: state.entities[state.ui.currentVideo],
  currentUserId: state.entities[state.session.currentUserId]
});

const mapDispatchToProps = dispatch => ({
  processForm: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm);
