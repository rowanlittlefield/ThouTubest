import React from 'react';
import { withRouter } from 'react-router-dom';
import VolumeControls from './video_controls/volume_controls';
import ProgressBar from './video_controls/progress_bar';
import PlayPauseButton from './video_controls/play_pause_button';

class VideoStreamer extends React.Component {
  constructor(props) {
    super(props);
    this.hoverFlag = false;
    this.controlsOpacity = true;
  }

  componentDidMount() {
    this.videoPlayerControlsScript();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.videoId && nextProps.match.params.videoId != this.props.video.id) {
      const videoControls = document.getElementById("video-player-controls");
      const videoPlayer = document.getElementById("video-show-player");
      this.increaseControlsOpacity(videoPlayer, videoControls);
      const that = this;
      this.hoverFlag = false;
      setTimeout(() => {
        if (!that.hoverFlag) {
          that.decreaseControlsOpacity.bind(that, videoPlayer, videoControls)();
        }
      }, 3000);
    }
  }

  videoPlayerControlsScript() {
    const video = document.getElementById("video");
    const digitalClock = document.getElementById("digitalClock");
    const videoControls = document.getElementById("video-player-controls");
    const videoPlayer = document.getElementById("video-show-player");
    this.updateProgressDigitalClock(video, digitalClock);

    video.controls = false;
    video.addEventListener("timeupdate", this.updateProgressDigitalClock.bind(this, video, digitalClock), false);
    videoPlayer.addEventListener('mouseover', this.increaseControlsOpacity.bind(this, videoPlayer, videoControls));
    videoPlayer.addEventListener('mouseout', this.decreaseControlsOpacity.bind(this, videoPlayer, videoControls));
    // videoPlayer.addEventListener('mousemove', this.toggleControlsOpacity.bind(this, ));
    const that = this;
    setTimeout(() => {
      if (!that.hoverFlag) {
        that.decreaseControlsOpacity.bind(that, videoPlayer, videoControls)();
      }
    }, 3000);
  }

  displayVideoControls() {

    return (
      <div id="video-player-controls" className="video-player-controls">
        <ProgressBar />
        <div className="video-player-controls-icons">
          <div className="video-player-controls-icons-left">
            <PlayPauseButton />
            <VolumeControls />
            <div className="video-player-digital-clock" id="digitalClock"></div>
          </div>

          <div className="video-player-controls-icons-right">
          </div>
        </div>

      </div>
    );
  }

  updateProgressDigitalClock(video, digitalClock) {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    const durationMin = Math.floor(video.duration / 60);
    const durationSec =  Math.floor(video.duration % 60);
    digitalClock.innerHTML = (video.duration ?
       `${minutes}:${seconds}` + ' / ' +`${durationMin}:${durationSec}` : '');
  }

  increaseControlsOpacity(video, videoControls) {
    this.hoverFlag = true;
    if (Number(videoControls.style.opacity) < 1) {
      for(let i = 1; i <= 5; i++) {
        setTimeout(() => {
          videoControls.style.opacity = 0.2 * i;
        }, 30 * i);
      }
    }
  }

  decreaseControlsOpacity(video, videoControls, eve) {
    const videoPlayer = document.getElementById("video-show-player");
    if (!eve || (!videoControls.contains(eve.relatedTarget) &&
     !videoPlayer.contains(eve.relatedTarget))) {
      for(let i = 4; i >= 0; i--) {
        setTimeout(() => {
          videoControls.style.opacity = 0.2 * i;
        }, 30*(4 - i));
      }
    }
  }

  render() {
    if (!this.props.video) return null;

    return(
      <div id="video-show-player" className="video-show-player">
        <div className="video-streamer-div">
          <video src={this.props.video.film_url}
            width="850px" height="480px" id="video" autoPlay/>
          {this.displayVideoControls()}
        </div>
      </div>

    );
  }
}

export default withRouter(VideoStreamer);
