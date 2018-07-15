import React from 'react';
import { Link } from 'react-router-dom';
import CommentListItem from './comment_list_item';

const CommentList = ({comments, commentIds, getComments, videoId, type}) => {
  const filteredComments = [];
  for(let i = 0; i < commentIds.length; i++) {
    if(comments[commentIds[i]]) {
      filteredComments.push(comments[commentIds[i]]);
    }
  }

  const listItems = filteredComments.map(comment => {
    return (<CommentListItem
      key={comment.id}
      comment={comment}
      getComments={getComments}
      videoId={videoId}
      commentIds={commentIds}
      type={type}/>);
  });
  
  return (
    <ul className="comment-show-commentlist">
      {listItems}
    </ul>
  );
}

export default CommentList;
