import React from 'react';
import { Link } from 'react-router-dom';
import VideoListItem from './video_list_item';

const VideoList = ({type, videos, videoList, header, urlPrefix}) => {
  const listItems = videoList.map(idx => {
  const video = videos[idx];
  return (
    <VideoListItem key={video.id} type={type} video={video} urlPrefix={urlPrefix} />
    );
  });

  return (
    <div className={`${type}-list`}>
      <span className={`${type}-list-header`}>{header}</span>
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

export default VideoList;
