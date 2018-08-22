import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CommentListItem from './comment_list_item';

const CommentList = ({currentLevelCommentIds, currentVideoId, type}) => {

  const listItems = currentLevelCommentIds.map(id => {
    return (<CommentListItem
      key={id}
      id={id}
      currentVideoId={currentVideoId}
      type={type}/>);
  });

  return (
    <ul className="comment-show-commentlist">
      {listItems}
    </ul>
  );
}

export const msp = (state, ownProps) => {
  const filteredCommentIds = [];

  const currentVideoId = ownProps.match.params.videoId;
  const parentCommentId = ownProps.parentCommentId;
  const commentIds = (state.entities.videos[currentVideoId] ?
    state.entities.videos[currentVideoId].comment_ids : []);

  for(let i = 0; i < commentIds.length; i++) {
    const comment = state.entities.comments[commentIds[i]];
    if(comment && `${comment.video_id}` === currentVideoId &&
      comment.parent_comment_id === parentCommentId) {
      filteredCommentIds.push(commentIds[i]);
    }
  }
  
  return {
    currentVideoId: ownProps.match.params.videoId,
    currentLevelCommentIds: filteredCommentIds
  };
};

export default withRouter(connect(msp, null)(CommentList));