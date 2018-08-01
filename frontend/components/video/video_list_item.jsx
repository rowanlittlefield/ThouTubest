import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getVideo } from '../../actions/video_actions';
import Thumbnail from './thumbnail';

const VideoListItem = ({type, video, user, getVideo, videoId}) => {
  const username = user ? user.username : '';

  const createdAtString = video.created_at;
  let whenUploaded
  if (createdAtString) {
    const dateString = createdAtString.slice(0,10);
    const [year, month, day] = dateString.split('-');
    const today = new Date();
    const [currentYear, currentMonth, currentDay] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
    whenUploaded = ((currentYear - year) * 365) + ((currentMonth - month) * 30) + (currentDay - day);
  } else {
    whenUploaded = '0';
  }

  return (
    <div className={`${type}-list-item`}>
      <Link className={`${type}-list-item-link`} to={`/videos/${video.id}`}>

        <Thumbnail video={video} type={type} videoId={videoId} />
        <div className={`${type}-thumbnail-content`}>
          <div className={`${type}-list-item-title`}>{video.title}</div>
          <div className={`${type}-list-item-author`}>{username}</div>
          <div className={`${type}-list-item-views`}>{video.views} views
            <span className={`${type}-list-item-age`}> <span>&middot;</span> {whenUploaded} days ago</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const msp = (state, ownProps) => {
  const video = state.entities.videos[ownProps.videoId];
  return {
    video,
    user: state.entities.users[video.uploader_id]
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    getVideo: (id) => dispatch(getVideo(id))
  };
}

export default withRouter(connect(msp, mdp)(VideoListItem));
