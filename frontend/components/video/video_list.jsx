import React from 'react';
import { Link } from 'react-router-dom';
import VideoListItem from './video_list_item';

const VideoList = ({type, videos, videoList}) => {
  debugger;
  const listItems = videoList.map(idx => {
  const video = videos[idx];
  return (
    <VideoListItem key={video.id} type={type} video={video} />
    );
  });

  return (
    <div className={`${type}-list`}>
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

export default VideoList;
