import React from 'react';
import { withRouter } from 'react-router-dom';
import VideoIndexBanner from './video_index_banner';
import VideoList from '../video_list';

class VideoIndex extends React.Component {

  componentDidMount() {
    this.props.getVideos(20, 0);
  }

  displayVideoIndexItems() {

    const videoLists = this.props.videoIdsByList.map((group, idx) => {
      return (<VideoList header="Popular Uploads"
        key={idx}
        type="index"
        videoIds={group} />);
    });

    return (
      <ul className="video-index-list-rows">
        {videoLists}
      </ul>
    );
  }

  render() {
    return (
      <div className="video-index">
        <VideoIndexBanner />
        {this.displayVideoIndexItems()}
      </div>
    );
  }
}

export default withRouter(VideoIndex);
