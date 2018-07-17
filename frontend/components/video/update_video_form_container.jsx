import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getVideo, updateVideo, clearErrors, dispatchErrors } from '../../actions/video_actions';
import UpdateVideoForm from './update_video_form';

const mapStateToProps = (state, ownProps) => ({
  video: state.entities.videos[ownProps.match.params.videoId],
  errors: state.errors.videos,
  formType: 'updateVideo',
  currentUserId: state.session.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: video => dispatch(updateVideo(video)),
  getVideo: () => dispatch(getVideo(ownProps.match.params.videoId)),
  clearErrors: () => dispatch(clearErrors()),
  dispatchErrors: errors => dispatch(dispatchErrors(errors))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateVideoForm);
