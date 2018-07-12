import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: {}
    };
  }

  componentDidMount() {
    debugger;
    this.props.getVideo(this.props.match.params.videoId).then(response => {
        this.setState({video: response.video})
    });
  }

  displayVideoPlayerElement() {
    if (this.state.video.film_url) {
      return (
        <div className="video-player-video">
          <video src={this.state.video.film_url}
            width="850px" height="480px" controls id="video" />
        </div>
      );
    } else {
      return null
    }
  }

  // displayThumbnailImage() {
  //   debugger
  //   if (this.state.video.thumbnail_image_url) {
  //     return (
  //       <div className="thumbnail">
  //         <img className="thumbnail-image" width="170px" height="95px"
  //           src={this.state.video.thumbnail_image_url} />
  //         <span className="thumbnail-duration"></span>
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // }

  render() {
    return(
      <div className="video-player">
        <h1>VideoPlayer Component render</h1>
        <h2>Video Sample</h2>
        {this.displayVideoPlayerElement()}
      </div>
    );
  }
}

export default withRouter(VideoPlayer);
