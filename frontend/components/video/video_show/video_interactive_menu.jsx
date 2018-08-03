import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVideoLike, updateLike } from '../../../actions/like_actions';

class VideoInteractiveMenu extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     numLikes:
  //   };
  // }

  likeVideo(isDislike, eve) {
    eve.preventDefault();
    debugger
    if (!this.props.currentUserId) {
      this.props.history.push('/login');
    } else if (!this.props.currentUserLike) {
      this.props.createLike(
        this.props.currentUserId,
        this.props.video.id,
        isDislike
      );
    } else if (this.props.currentUserLike &&
      this.props.currentUserLike.is_dislike != isDislike) {
        this.props.updateLike(this.props.currentUserLike.id, isDislike);
    }

    // this.props.currentUser.liked_video_ids.includes(this.props.video.id)
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
  const currentUser = session.id ? entities.users[session.id] : {};
  const likes = entities.likes
  // const currentUserLikeId = currentUser.like_ids ? currentUser.like_ids : null
  let currentUserLike = null;
  if (currentUser.like_ids) {
    for(let i = 0; i < currentUser.like_ids.length; i++) {
      let like = likes[currentUser.like_ids[i]];
      if (like && like.likeable_type === 'Video' && like.user_id === currentUser.id &&
        like.likeable_id === video.id) {
        currentUserLike = like;
        console.log('found it');
        i = currentUser.like_ids.length;
      }
    }
  }

  return {
  video,
  user: video ? entities.users[video.uploader_id] : {},
  currentUserId: session.id,
  currentUser: session.id ? entities.users[session.id] : {},
  currentUserLike: currentUserLike
  };
};

const mdp = dispatch => ({
  // deleteVideo: id => dispatch(deleteVideo(id))
  createLike: (currentUserId, videoId, isDislike) => dispatch(createVideoLike(currentUserId, videoId, isDislike)),
  updateLike: (id, is_dislike) => dispatch(updateLike(id, is_dislike))
});

export default withRouter(connect(msp, mdp)(VideoInteractiveMenu));
// export default VideoInteractiveMenu;
