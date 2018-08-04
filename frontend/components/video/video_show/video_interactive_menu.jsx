import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVideoLike, updateLike, deleteLike } from '../../../actions/like_actions';

class VideoInteractiveMenu extends React.Component {
  componentDidMount() {
    this.setLikeBarRatio();
  }

  componentDidUpdate() {
    this.setLikeBarRatio();
  }

  likeVideo(isDislike, eve) {
    eve.preventDefault();
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
    } else {
      this.props.deleteLike(this.props.currentUserLike.id);
    }
  }

  setLikeBarRatio() {
    const num_likes = this.props.video.num_likes;
    const total_likes = this.props.video.num_dislikes + num_likes;
    const likesButton = document.getElementById("video-player-like-button-likes");
    const likesImage = document.getElementById("video-player-like-icon");
    const dislikesButton = document.getElementById("video-player-like-button-dislikes")
    const dislikesImage = document.getElementById("video-player-dislike-icon");
    const likeBarRatio = document.getElementById("video-player-like-bar-ratio");
    likeBarRatio.style.width = `${141*(num_likes/total_likes)}px`

    if (!this.props.currentUserLike) {
      likeBarRatio.style.background = '#9b9b9b';
      this._colorLikes(dislikesButton, dislikesImage, '#9b9b9b', 'dis', 'Sheet');
      this._colorLikes(likesButton, likesImage, '#9b9b9b', '', 'Sheet');
    } else if (!this.props.currentUserLike.is_dislike) {
      likeBarRatio.style.background = 'rgb(6, 95, 212)';
      this._colorLikes(likesButton, likesImage, 'rgb(6, 95, 212)', '', 'Highlight');
      this._colorLikes(dislikesButton, dislikesImage, '#9b9b9b', 'dis', 'Sheet');
    } else {
      likeBarRatio.style.background = 'rgb(6, 95, 212)';
      this._colorLikes(dislikesButton, dislikesImage, 'rgb(6, 95, 212)', 'dis', 'Highlight');
      this._colorLikes(likesButton, likesImage, '#9b9b9b', '', 'Sheet');
    }
  }

  _colorLikes(button, image, color, prefix, suffix) {
    button.style.color = color;
    image.src = window[`${prefix}likeIcon${suffix}`];
  }

  render() {
    const video = this.props.video;
    if(!video) return null;
    return (
      <span className="video-player-footer-interactive-menu">
        <button className="video-player-like-button"
          id="video-player-like-button-likes"
           onClick={this.likeVideo.bind(this, false)}>
          <img id="video-player-like-icon"
            className="video-player-like-icon"
            src={window.likeIconSheet}/> <span>{video.num_likes}</span>
        </button>
        <button className="video-player-like-button"
           id="video-player-like-button-dislikes"
           onClick={this.likeVideo.bind(this, true)}>
          <img id="video-player-dislike-icon"
            className="video-player-like-icon"
            src={window.likeIcon}/> <span>{video.num_dislikes}</span>
        </button>
        <div className="video-player-like-bar"></div>
        <div id="video-player-like-bar-ratio"
          className="video-player-like-bar-ratio"></div>
      </span>
    );
  }
}


const msp = ({ entities, session }, ownProps) => {
  const video = entities.videos[ownProps.match.params.videoId];
  const currentUser = session.id ? entities.users[session.id] : {};
  const likes = entities.likes

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
  createLike: (currentUserId, videoId, isDislike) => dispatch(createVideoLike(currentUserId, videoId, isDislike)),
  updateLike: (id, is_dislike) => dispatch(updateLike(id, is_dislike)),
  deleteLike: id => dispatch(deleteLike(id))
});

export default withRouter(connect(msp, mdp)(VideoInteractiveMenu));
