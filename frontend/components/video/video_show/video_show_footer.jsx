import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteVideo } from '../../../actions/video_actions';
import VideoInteractiveMenu from './video_interactive_menu';

class VideoShowFooter extends React.Component {

  handleDeleteVideo() {
    this.props.deleteVideo(this.props.match.params.videoId)
  }

  render() {
    const video = this.props.video;
    const user = this.props.user;
    if(!video || !user) return null;
    const isCurrentUser = (this.props.currentUserId && user && this.props.currentUserId === user.id ? '' : ' hidden');
    let date;
    if (video) {
      const createdAtString = video.created_at;
      const dateString = createdAtString.slice(0,10);
      let [year, month, day] = dateString.split('-');

      if (parseInt(day) <= 9) {
        day = day[1];
      }

      const monthStrings = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
      };

      date = `${monthStrings[month]} ${day}, ${year}`;
    } else {
      date = '';
    }

    return (
      <div className="video-show-footer">
        <h1 className="video-player-title">{video.title}</h1>
        <div className="video-player-footer-info">
          <span className="video-player-footer-views">{video.views} views</span>
          <VideoInteractiveMenu />
        </div>
        <div className="video-player-secondary-info">
          <div className="video-player-secondary-info-top-row">
            <div className="video-player-image-and-uploader-info">
              <img className="video-player-secondary-info-image" width="48px" height="48px" src={user.image_url}/>
              <div className="video-player-uploader-info">
                <span className="video-player-footer-username">{user.username}</span>
                <span className="video-player-footer-date">Published on {date}</span>
              </div>
            </div>
            <div className={"video-player-edit-and-delete" + isCurrentUser}>
              <Link className="video-player-edit-button" to={`/videos/${video.id}/edit`}>edit video</Link>
              <button className="video-player-delete-button" onClick={this.handleDeleteVideo.bind(this)}>delete video</button>
            </div>
          </div>
          <div className="video-player-footer-description-row">
            {video.description}
          </div>
        </div>
      </div>
    );
  }
}

const msp = ({ entities, session }, ownProps) => {
  const video = entities.videos[ownProps.match.params.videoId];

  return {
  video,
  user: video ? entities.users[video.uploader_id] : {},
  currentUserId: session.id
  };
};

const mdp = dispatch => ({
  deleteVideo: id => dispatch(deleteVideo(id))
});

export default withRouter(connect(msp, mdp)(VideoShowFooter));
