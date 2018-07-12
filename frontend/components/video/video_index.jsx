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
      debugger;
        return this.setState({
          videos: response.videos,
          videoList: response.videoList
        });
    });
  }

  render() {
    debugger;
    return (
      <h1>Showing the video index!</h1>
    );
  }
}

export default withRouter(VideoIndex);
