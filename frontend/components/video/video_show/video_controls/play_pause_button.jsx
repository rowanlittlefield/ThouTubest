import React from 'react';

class PlayPauseButton extends React.Component {

  componentDidMount() {
    this.enableControls();
  }

  enableControls() {
    const video = document.getElementById("video");
    const playpause = document.getElementById("playpause");
    playpause.addEventListener('click', this.togglePlayPause.bind(this, video, playpause));
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

  render() {
    return (
      <button id="playpause" className="video-player-playpause-button">
        <div className="video-player-arrow-right"></div>
      </button>
    );
  }
}

export default PlayPauseButton;
