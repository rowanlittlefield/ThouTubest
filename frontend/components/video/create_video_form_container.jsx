import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { createVideo, clearErrors, dispatchErrors } from '../../actions/video_actions';
import CreateVideoForm from './create_video_form';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.videos,
  formType: 'createVideo',
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
  processForm: video => dispatch(createVideo(video)),
  clearErrors: () => dispatch(clearErrors()),
  dispatchErrors: errors => dispatch(dispatchErrors(errors))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateVideoForm);
