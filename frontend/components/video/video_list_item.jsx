import React from 'react';
import { Link } from 'react-router-dom';

const VideoListItem = ({type, video}) => {
  return (
    <div className={`${type}-list-item`}>
      <Link to={`videos/${video.id}`}>
        <img className={`${type}-thumbnail-image`} width="210px" height="118px" src={video.thumbnail_image_url} />
        <span className={`${type}-thumbnail-duration`}>0:00</span>
        <div className={`${type}-list-item-title`}>{video.title}</div>
        <div className={`${type}-list-item-author`}>Author Username</div>
        <div className={`${type}-list-item-views`}>{video.views} views <span>&middot;</span> _ days ago</div>
      </Link>
    </div>
  );
};

export default VideoListItem;
