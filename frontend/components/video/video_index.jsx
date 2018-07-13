import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import VideoListItem from './video_list_item';

class VideoIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: {},
      videoList: []
    };
  }

  componentDidMount() {
    this.props.getVideos().then(response => {
      return this.setState({
        videos: response.videos,
        videoList: response.videoList
      });
    });
  }

  displayVideoIndexItems() {
    const that = this;
    if (that.state.videoList.length > 0) {
      const listItems = that.state.videoList.map(idx => {
      const video = that.state.videos[idx];
      return (
        <VideoListItem key={video.id} type="index" video={video} />
        );
      });

      return (
        <div>
          <ul>
            {listItems}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="video-index">
        <h1>Place holder for main logo-banner/ advertisement</h1>
        {this.displayVideoIndexItems()}
      </div>
    );
  }
}

export default withRouter(VideoIndex);
