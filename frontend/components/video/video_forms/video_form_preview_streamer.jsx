import React from 'react';

class VideoFormPreviewStreamer extends React.Component {

  limitPreviewDuration(eve) {
    const video = eve.target
    if (video.currentTime >= 8) {
      video.currentTime = 0;
      video.pause();
     }
   }

   togglePlayPause() {
     const video = document.getElementById("video");
     (video.paused || video.ended) ? video.play() : video.pause();
   }

  render() {
    return (
      <div className="create-video-film-preview-div">
        <video id="video" width='340px' height="300px" src={this.props.filmUrl}
          onTimeUpdate={(eve) => this.limitPreviewDuration(eve) }/>
        <div className="create-video-film-preview-play-icon" onClick={
            () => this.togglePlayPause()
          }>
        </div>
      </div>
    );
  }
}

export default VideoFormPreviewStreamer;
