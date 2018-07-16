import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class VideoStreamer extends React.Component {

  constructor(props) {
    super(props);
    this.updated = false;
  }

  // componentWillReceiveProps() {
  // }

  componentWillMount() {
    const videoId = this.props.match.params.videoId;
    this.props.getVideo(videoId);
  }

  componentDidUpdate() {
    if (!this.updated) {
      this.updated = true;
      this.videoPlayerControlsScript();
    }
  }

  videoPlayerControlsScript() {
    const video = document.getElementById("video");
    const playpause = document.getElementById("playpause");
    const progess = document.getElementById("progress");
    const progressBar = document.getElementById("progressBar");
    const digitalClock = document.getElementById("digitalClock");
    const muteButton = document.getElementById("mute-button");
    const volumeSlider = document.getElementById("volume-slider");
    this.updateProgressDigitalClock(video, digitalClock);

    video.controls = false;
    playpause.addEventListener('click', this.togglePlayPause.bind(this, video, playpause));
    video.addEventListener("timeupdate", this.updateProgress.bind(this, video, progress), false);
    video.addEventListener("timeupdate", this.updateProgressDigitalClock.bind(this, video, digitalClock), false);
    progressBar.addEventListener('click', this.changeProgress.bind(this, video));
    muteButton.addEventListener('mouseover', this.toggleVolumeControls.bind(this, volumeSlider));
    muteButton.addEventListener('mouseout', this.toggleVolumeControls.bind(this, volumeSlider));
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
        <img className="video-player-mute-button" id="mute-button"
           width="45px"
           height="45px"
           src={window.volumeIcon}/>
        <input id="volume"
           min="0" max="1" step="0.1" id="volume-slider"
           className={"video-layer-volume-slider" + " hidden"} type="range" />
      </div>
    );
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

  changeProgress(video, eve) {
    if (video && eve.layerX / 810 <= 1) {
      video.currentTime = (eve.layerX / 810) * video.duration;
    }
    console.log(eve.layerX / 810);
  }

  toggleVolumeControls(volumeSlider) {
    volumeSlider.classList.toggle('hidden');
  }

  updateProgressDigitalClock(video, digitalClock) {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    const durationMin = Math.floor(video.duration / 60);
    const durationSec =  Math.floor(video.duration % 60);
    digitalClock.innerHTML = (video.duration ?
       `${minutes}:${seconds}` + ' / ' +`${durationMin}:${durationSec}` : '');
  }

  render() {
    if (!this.props.video) return null;

    return(
      <div className="video-streamer-div">
        <video src={this.props.video.film_url}
            width="850px" height="480px" id="video" autoPlay/>
        {this.displayVideoControls()}
      </div>
    );
  }
}

export default withRouter(VideoStreamer);
