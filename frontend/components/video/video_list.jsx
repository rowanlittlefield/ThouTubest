import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import VideoListItem from './video_list_item';
import { connect } from 'react-redux';

const VideoList = ({videoIds, type, currentVideoId, header}) => {
  const siftedIds = [];
  
  for(let i = 0; i < videoIds.length; i++) {
    if(videoIds[i] != currentVideoId) {
      siftedIds.push(videoIds[i]);
    }
  }
  const listItems = siftedIds.map(id => {
  return (
    <VideoListItem key={id}
       type={type}
       videoId={id} />
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

const msp = (state, ownProps) => {
  return {
    currentVideoId: ownProps.match.params.videoId
  };
};

export default withRouter(connect(msp, null)(VideoList));
