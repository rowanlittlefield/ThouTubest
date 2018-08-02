import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVideoLike } from '../../../actions/like_actions';

class VideoInteractiveMenu extends React.Component {

  likeVideo(isDislike, eve) {
    eve.preventDefault();
    this.props.createLike(
      this.props.currentUserId,
      this.props.video.id,
      isDislike
    );
  }

  render() {
    const video = this.props.video
    if(!video) return null;
    return (
      <span className="video-player-footer-interactive-menu">
        <button className="video-player-like-button" onClick={this.likeVideo.bind(this, false)}>
          <img className="video-player-like-icon"
            src={window.likeIcon}/> <span>{video.num_likes}</span>
        </button>
        <button className="video-player-like-button" onClick={this.likeVideo.bind(this, true)}>
          <img className="video-player-like-icon"
            src={window.likeIcon}/> <span>{video.num_dislikes}</span>
        </button>
      </span>
    );
  }
}


const msp = ({ entities, session }, ownProps) => {
  const video = entities.videos[ownProps.match.params.videoId];
  return {
  video,
  user: video ? entities.users[video.uploader_id] : {},
  currentUserId: session.id
  };
};

const mdp = dispatch => ({
  // deleteVideo: id => dispatch(deleteVideo(id))
  createLike: (currentUserId, videoId, isDislike) => dispatch(createVideoLike(currentUserId, videoId, isDislike))
});

export default withRouter(connect(msp, mdp)(VideoInteractiveMenu));
// export default VideoInteractiveMenu;
