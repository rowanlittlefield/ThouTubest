import React from 'react';
import { Link } from 'react-router-dom';
import CommentListItem from './comment_list_item';

const CommentList = ({comments, commentIds}) => {
  const filteredComments = [];
  for(let i = 0; i < commentIds.length; i++) {
    if(comments[commentIds[i]]) {
      filteredComments.push(comments[commentIds[i]]);
    }
  }

  const listItems = filteredComments.map(comment => {
    return (<CommentListItem key={comment.id} comment={comment}/>);
  });
  
  return (
    <ul className="comment-show-commentlist">
      {listItems}
    </ul>
  );
}

export default CommentList;
