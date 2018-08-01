import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class VideoStreamer extends React.Component {
  constructor(props) {
    super(props);
    this.hoverFlag = false;
  }

  componentDidMount() {
    this.videoPlayerControlsScript();
  }

  videoPlayerControlsScript() {
    const video = document.getElementById("video");
    const playpause = document.getElementById("playpause");
    const progess = document.getElementById("progress");
    const progressBar = document.getElementById("progressBar");
    const digitalClock = document.getElementById("digitalClock");
    const muteButton = document.getElementById("mute-button");
    const volumeControls = document.getElementById("video-player-volume-controls");
    const volumeSlider = document.getElementById("volume-slider");
    const videoControls = document.getElementById("video-player-controls");
    const videoPlayer = document.getElementById("video-show-player");
    this.updateProgressDigitalClock(video, digitalClock);

    video.controls = false;
    playpause.addEventListener('click', this.togglePlayPause.bind(this, video, playpause));
    video.addEventListener("timeupdate", this.updateProgress.bind(this, video, progress), false);
    video.addEventListener("timeupdate", this.updateProgressDigitalClock.bind(this, video, digitalClock), false);
    progressBar.addEventListener('click', this.changeProgress.bind(this, video));
    volumeControls.addEventListener('mouseover', this.toggleVolumeControls.bind(this, volumeSlider));
    volumeControls.addEventListener('mouseout', this.toggleVolumeControls.bind(this, volumeSlider));
    volumeSlider.addEventListener('input', this.setVolume.bind(this, video, volumeSlider));
    muteButton.addEventListener('click', this.toggleMute.bind(this, video));
    videoPlayer.addEventListener('mouseover', this.increaseControlsOpacity.bind(this, videoPlayer, videoControls));
    videoPlayer.addEventListener('mouseout', this.decreaseControlsOpacity.bind(this, videoPlayer, videoControls));
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

        <div id="progressBar" className="video-player-progress-bar">
          <span id="progress" height="100%" opacity="1" className="video-player-progress"></span>
        </div>

        <div className="video-player-controls-icons">
          <div className="video-player-controls-icons-left">
            <button id="playpause" className="video-player-playpause-button">
              <div className="video-player-arrow-right"></div>
            </button>

            <div id="video-player-volume-controls" className="video-player-volume-controls">
              <img className="video-player-mute-button" id="mute-button"
                width="45px"
                height="45px"
                src={window.volumeIcon}/>
              <input id="volume-slider"
                min="0" max="1" step="0.01" id="volume-slider"
                className={"video-layer-volume-slider" + " hidden"} type="range" />
            </div>

            <div className="video-player-digital-clock" id="digitalClock"></div>
          </div>

          <div className="video-player-controls-icons-right">
          </div>
        </div>

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

  setVolume(video, volume) {
    video.volume = volume.value;
  }

  toggleMute(video) {
    video.muted = !video.muted;
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
    console.log('you did it');
    const videoPlayer = document.getElementById("video-show-player");
    if (!eve || (!videoControls.contains(eve.relatedTarget) && !videoPlayer.contains(eve.relatedTarget))) {
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
