import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getVideo } from '../../actions/video_actions';
import { resourceAge } from '../../util/resource_age_util';

const VideoListItem = ({type, video, user, getVideo}) => {
  const username = user ? user.username : '';
  const length = video.length;
  const description = <div className="search-list-item-description">{video.description}</div>;
  let duration;
  if (length) {
    const minutes = `${Math.floor(length / 60)}`;
    const seconds = length % 60 > 9 ? `${length % 60}` : "0" + `${length % 60}`;
    duration = minutes + ':' + seconds;
  } else {
    duration = '0:00';
  }

  const whenUploaded = (video ? resourceAge(video.created_at) : 0);

  return (
    <div className={`${type}-list-item`}>
      <Link className={`${type}-list-item-link`} to={`/videos/${video.id}`}>

        <img className={`${type}-thumbnail-image`} src={video.thumbnail_image_url} />
        <span className={`${type}-thumbnail-duration`}>
          {duration}
        </span>
        <div className={`${type}-thumbnail-content`}>
          <div className={`${type}-list-item-title`}>{video.title}</div>
          <div className={`${type}-list-item-author`}>{username}</div>
          {type === 'search' ? <span className="search-list-item-extra-dot">&nbsp; &middot; &nbsp;</span> : ''}
          <div className={`${type}-list-item-views`}>{video.views} views
            <span className={`${type}-list-item-age`}> <span>&middot;</span> {whenUploaded} days ago</span>
          </div>
          {type === 'search' ? description : null}
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
