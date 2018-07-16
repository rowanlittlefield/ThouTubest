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

    return(
      <div className="video-show">
        <div className="video-show-left-col">
          <div className="video-show-player">

            <VideoStreamer />
          </div>
          <div className="video-show-footer">
          </div>
          <div className="comment-show">

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

// <CommentShowContainer videoId={this.state.videoId} />
