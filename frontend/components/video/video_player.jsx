import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    this.updated = false;
  }

  componentWillMount() {
    this.props.getVideo(this.props.match.params.videoId).then(response => {
        this.setState({video: response.video})
    });
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

  componentDidUpdate() {
    if(!this.updated) {
      this.updated = true;
      this.videoPlayerControlsScript();
    }
  }

  displayVideoPlayerElement() {
    if (this.state.video.film_url) {
      return (
        <div className="video-player-video">
          <video src={this.state.video.film_url}
              width="850px" height="480px" id="video"/>
        </div>
      );
    } else {
      return null;
    }
  }

  videoPlayerControlsScript() {
    const video = document.getElementById("video");
    const playpause = document.getElementById("playpause");
    const progess = document.getElementById("progress");
    const digitalClock = document.getElementById("digitalClock");
    this.updateProgressDigitalClock(video, digitalClock);

    video.controls = false;
    playpause.addEventListener('click', this.togglePlayPause.bind(this, video, playpause));
    video.addEventListener("timeupdate", this.updateProgress.bind(this, video, progress), false);
    video.addEventListener("timeupdate", this.updateProgressDigitalClock.bind(this, video, digitalClock), false);

  }

  displayVideoControls() {
    return (
      <div className="video-player-controls">
        <button id="playpause" className="video-player-playpause-button">
          <div className="video-player-arrow-right"></div>
        </button>

        <div id="progressBar" className="video-player-progress-bar">
          <span id="progress" height="100%" opacity="1" className="video-player-progress"></span>
        </div>

        <div className="video-player-digital-clock" id="digitalClock"></div>
      </div>
    );
  }

  displayVideoList() {
    if (this.state.videoListIds.length > 0) {
      return (
        <VideoList header="Up next"
          type="show"
          videos={this.state.videos}
          videoList={this.state.videoListIds}
          urlPrefix={'videos'} />
      );
    } else {
      return null;
    }
  }

  togglePlayPause(video, playpause) {
    if (video.paused || video.ended) {
      playpause.title = "pause";
      video.play();
    }
    else {
      playpause.title = "play";
      video.pause();
    }
  }

  updateProgress(video, progress) {
    let value = 0;
    if (video.currentTime > 0) {
      value = (100 / video.duration) * video.currentTime;
    }
    progress.style.width = value + "%";
  }

  updateProgressDigitalClock(video, digitalClock) {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    const durationMin = Math.floor(video.duration / 60);
    const durationSec = Math.floor(video.duration % 60);
    digitalClock.innerHTML = `${minutes}:${seconds}` + ' / ' +`${durationMin}:${durationSec}`;
  }

  render() {

    return(
      <div className="video-show">
        <div className="video-show-left-col">
          <div className="video-show-player">
            {this.displayVideoPlayerElement()}
            {this.displayVideoControls()}
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
