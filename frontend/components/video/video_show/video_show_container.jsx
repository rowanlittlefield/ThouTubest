import { connect } from 'react-redux';
import React from 'react';
import { getVideo } from '../../../actions/video_actions';
import VideoShow from './video_show';
import { getVideoIds } from '../../../reducers/selectors/video_selectors';

const mapStateToProps = ({ entities, session }, ownProps) => {
  const video = entities.videos[ownProps.match.params.videoId];

  return {
  video,
  user: video ? entities.users[video.uploader_id] : {},
  videoIds: getVideoIds(entities.videos),
  currentUserId: session.id
  };
};

const mapDispatchToProps = dispatch => ({
  getVideo: (id, limit, offset) => dispatch(getVideo(id, limit, offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow);
