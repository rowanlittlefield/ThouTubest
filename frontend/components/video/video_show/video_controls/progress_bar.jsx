import React from 'react';

class ProgressBar extends React.Component {

  componentDidMount() {
    this.enableControls();
  }

  enableControls() {
    const video = document.getElementById("video");
    const progess = document.getElementById("progress");
    const progressBar = document.getElementById("progressBar");

    video.addEventListener("timeupdate", this.updateProgress.bind(this, video, progress), false);
    progressBar.addEventListener('click', this.changeProgress.bind(this, video));
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

  render() {
    return (
      <div id="progressBar" className="video-player-progress-bar">
        <span id="progress" height="100%" opacity="1" className="video-player-progress"></span>
      </div>
    );
  }
}

export default ProgressBar;
