import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import VideoStreamer from './video_streamer_container';
import VideoList from './video_list';
import CommentShowContainer from '../comments/comment_show_container'

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: {},
      videos: {},
      videoListIds: []
    };
  }

  componentDidMount() {
    this.props.getVideos().then(response => {
        const videoId = this.props.match.params.videoId;
        this.setState({
          video: response.videos[videoId],
          videos: response.videos,
          videoListIds: response.videoList
        });
    });
  }

  displayVideoList() {
    if (this.state.videoListIds.length > 0) {
      return (
        <VideoList header="Up next"
          type="show"
          videos={this.state.videos}
          videoList={this.state.videoListIds}
          urlPrefix={'videos'}
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
            <CommentShowContainer videoId={this.state.videoId} />
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
