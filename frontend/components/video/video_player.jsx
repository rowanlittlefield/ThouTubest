import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import VideoStreamer from './video_streamer_container';
import VideoList from './video_list';
import CommentShowContainer from '../comments/comment_show_container'

class VideoPlayer extends React.Component {

  componentDidMount() {
    this.props.getVideos();
  }

  displayVideoList() {
    if (this.props.videoIds.length > 0) {
      return (
        <VideoList header="Up next"
          type="show"
          videoIds={this.props.videoIds}
          users={this.props.users} />
      );
    } else {
      return null;
    }
  }

  render() {
    const video = this.props.video;
    const user = this.props.user;
    const title = this.props.video ? this.props.video.title : 'null';
    const views = this.props.video ? this.props.video.views : 0;
    const image_url = user ? user.image_url: '';
    const isCurrentUser = (this.props.currentUserId && user && this.props.currentUserId === user.id ? '' : ' hidden');


    return(
      <div className="video-show">
        <div className="video-show-left-col">
          <div className="video-show-player">

            <VideoStreamer />
          </div>
          <div className="video-show-footer">
            <h1 className="video-player-title">{title}</h1>
            <div className="video-player-footer-info">
              <span className="video-player-footer-views">{views} views</span>
            </div>
            <div className="video-player-secondary-info">
              <div className="video-player-secondary-info-top-row">
                <div className="video-player-image-and-uploader-info">
                  <img className="video-player-secondary-info-image" width="48px" height="48px" src={image_url}/>
                  <div className="video-player-uploader-info">
                    <span className="video-player-footer-username">{user ? user.username : ''}</span>
                    <span className="video-player-footer-date">Published on _</span>
                  </div>
                </div>
                <div className={"video-player-edit-and-delete" + isCurrentUser}>
                  <Link className="video-player-edit-button" to="">edit video</Link>
                  <Link className="video-player-delete-button" to="">delete video</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-show">
            <CommentShowContainer />
          </div>
        </div>
      <div className="video-show-right-col">
        {this.displayVideoList()}
      </div>
      </div>
    );
  }
}

export default withRouter(VideoPlayer);
