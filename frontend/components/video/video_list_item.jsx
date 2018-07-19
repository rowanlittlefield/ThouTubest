import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getComments } from '../../actions/comment_actions';

const VideoListItem = ({type, video, user, getComments}) => {
  const username = user ? user.username : '';
  const length = video.length;
  let duration;
  if (length) {
    const minutes = `${Math.floor(length / 60)}`;
    const seconds = length % 60 > 9 ? `${length % 60}` : "0" + `${length % 60}`;
    duration = minutes + ':' + seconds;
  } else {
    duration = '0:00';
  }

  return (
    <div className={`${type}-list-item`}>
      <Link className={`${type}-list-item-link`} to={`/videos/${video.id}`} onClick={() => {
        }}>

        <img className={`${type}-thumbnail-image`} src={video.thumbnail_image_url} />
        <span className={`${type}-thumbnail-duration`}>
          {duration}
        </span>
        <div className={`${type}-thumbnail-content`}>
          <div className={`${type}-list-item-title`}>{video.title}</div>
          <div className={`${type}-list-item-author`}>{username}</div>
          <div className={`${type}-list-item-views`}>{video.views} views
            <span className={`${type}-list-item-age`}> <span>&middot;</span> _ days ago</span>
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

// const mdp = (dispatch, ownProps) => {
//   debugger
//   return {
//     getComments: () => dispatch(getComments(ownProps.match.params.videoId, null))
//   };
// }

export default withRouter(connect(msp, null)(VideoListItem));
