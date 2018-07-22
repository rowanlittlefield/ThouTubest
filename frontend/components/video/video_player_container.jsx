import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getVideo, getVideos, deleteVideo } from '../../actions/video_actions';
import VideoPlayer from './video_player';
import { getVideoIds } from '../../reducers/selectors/video_selectors';

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
  getVideo: (id, limit, offset) => dispatch(getVideo(id, limit, offset)),
  deleteVideo: id => dispatch(deleteVideo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
