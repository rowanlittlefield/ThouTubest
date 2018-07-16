import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import VideoList from './video_list';
// import VideoListItem from './video_list_item';

class VideoIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getVideos();
  }

  sortVideoKeysIntoLists() {

    const groupsOfFive = [];
    for(let i = 0; i < this.props.videoIds.length; i++) {
      if(i % 5 === 0) groupsOfFive.push([]);
      let videoKey = this.props.videoIds[i];
      groupsOfFive[groupsOfFive.length - 1].push(videoKey);
    }

    return groupsOfFive;
  }

  displayVideoIndexItems() {
    
    const that = this;
    if (that.props.videoIds.length > 0) {
      const videoKeysInGroupsOfFive = this.sortVideoKeysIntoLists();
      const videoLists = videoKeysInGroupsOfFive.map((groupOfFive, idx) => {
        return (<VideoList header="List Header"
          key={idx}
          type="index"
          videoIds={groupOfFive} />);
      });

      return (
        <ul className="video-index-list-rows">
          {videoLists}
        </ul>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="video-index">
        <div className="index-banner">
          <iframe width="425" height="240" src="https://www.youtube.com/embed/ARe9FupzuOA" frameBorder="0"></iframe>
          <div className="index-banner-info">
            <img className="index-banner-image" width="110" height="110" src={window.appAcademyLogo} />
            <div className="index-banner-subinfo">
              <div className="ad-name">App Academy coding bootcamp</div>
              <div className="advertiser"><strong className="ad-tag">Ad</strong> App Academy</div>
               <a className="index-banner-subinfo-button" href="https://www.appacademy.io/immersive/application/full-time">Apply Now</a>
            </div>
          </div>
        </div>
        {this.displayVideoIndexItems()}
      </div>
    );
  }
}

export default withRouter(VideoIndex);

// <VideoList type="index" videoList={this.state.videoList} videos={this.state.videos} />
