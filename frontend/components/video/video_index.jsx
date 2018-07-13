import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
      const thumbnail_image_url = video.thumbnail_image_url;
      const videoTitle = video.title;
      return (
        <div key={idx} className="index-list-item">
          <Link to={`videos/${video.id}`}>
            <img className="index-thumbnail-image" width="210px" height="118px" src={thumbnail_image_url} />
            <span className="thumbnail-duration">0:00</span>
            <div className="index-list-item-title">{videoTitle}</div>
            <div className="index-list-item-author">Author Username</div>
            <div className="index-list-item-views">{video.views} views <span>&middot;</span> _ days ago</div>
          </Link>
        </div>
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
