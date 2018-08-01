import React from 'react';

class VolumeControls extends React.Component {

  componentDidMount() {
    this.enableControls();
  }

  enableControls() {
    const volumeControls = document.getElementById("video-player-volume-controls");
    const muteButton = document.getElementById("mute-button");
    const volumeSlider = document.getElementById("volume-slider");

    volumeControls.addEventListener('mouseover', this.toggleVolumeControls.bind(this, volumeSlider));
    volumeControls.addEventListener('mouseout', this.toggleVolumeControls.bind(this, volumeSlider));
    volumeSlider.addEventListener('input', this.setVolume.bind(this, video, volumeSlider));
    muteButton.addEventListener('click', this.toggleMute.bind(this, video));
  }

  toggleVolumeControls(volumeSlider) {
    volumeSlider.classList.toggle('hidden');
  }

  setVolume(video, volume) {
    video.volume = volume.value;
  }

  toggleMute(video) {
    video.muted = !video.muted;
  }

  render() {
    return (
      <div id="video-player-volume-controls" className="video-player-volume-controls">
        <img className="video-player-mute-button" id="mute-button"
          width="45px"
          height="45px"
          src={window.volumeIcon}/>
        <input id="volume-slider"
          min="0" max="1" step="0.01" id="volume-slider"
          className={"video-layer-volume-slider" + " hidden"} type="range" />
      </div>
    );
  }
}

export default VolumeControls;
