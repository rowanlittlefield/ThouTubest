import React from 'react';
// import { withRouter } from 'react-router-dom';

class Thumbnail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isHovered: false}
  }

  componentDidMount() {
    this.setupListeners();
  }

  setupListeners() {
    const thumbnailImage = document.getElementById(`${this.props.type}-thumbnail-image-${this.props.videoId}`);
    const durationTag = document.getElementById(`${this.props.type}-thumbnail-duration-${this.props.videoId}`);
    thumbnailImage.addEventListener('mouseover',
    this.initiatePreview.bind(this, thumbnailImage, durationTag));
  }

  duration() {
    const length = this.props.video.length;
    let duration;
    if (length) {
      const minutes = `${Math.floor(length / 60)}`;
      const seconds = length % 60 > 9 ? `${length % 60}` : "0" + `${length % 60}`;
      return minutes + ':' + seconds;
    } else {
      return '0:00';
    }
  }

  initiatePreview() {
    console.log('enter thumbnail image');
    this.setState({isHovered: true}, () => {
      const thumbnailVideo = document.getElementById(`${this.props.type}-thumbnail-image-${this.props.videoId}`);
      thumbnailVideo.addEventListener('mouseout', this.exitPreview.bind(this));
      thumbnailVideo.addEventListener('timeupdate', this.limitPreviewDuration.bind(this, thumbnailVideo));
    });
  }

  exitPreview() {
    console.log('exit thumbnail image');
    if (this.state.isHovered) {
      this.setState({isHovered: false});
    }
  }

  limitPreviewDuration(video) {
    if (video.currentTime >= 2) {
      video.pause();
      this.exitPreview();
     }
  }

  render() {
    const type = this.props.type;
    if (this.state.isHovered) {
      return (
        <div className="thumbnail-image-duration-div">
          <video src={this.props.video.film_url}
            id={`${type}-thumbnail-image-${this.props.videoId}`}
            className={`${type}-thumbnail-video`}
            onProgress={() => {console.log('video loaded');}}
            autoPlay
            />

        </div>
      );
    }
    return (
      <div className="thumbnail-image-duration-div">
        <img id={`${type}-thumbnail-image-${this.props.videoId}`}
          className={`${type}-thumbnail-image`}
          src={this.props.video.thumbnail_image_url} />
        <span id={`${type}-thumbnail-duration-${this.props.videoId}`}
            className={`${type}-thumbnail-duration`}>
            {this.duration()}
          </span>
      </div>
    );
  }
}

export default Thumbnail;
