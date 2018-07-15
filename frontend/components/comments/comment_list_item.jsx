import React from 'react';
import { Link } from 'react-router-dom';

const CommentListItem = ({comment}) => {

  return (<li className="comment-listitem">
    <img className="comment-show-listitem-image" width="40px" height="40px"/>
    <div className="comment-show-listitem-content">
      <div className="comment-show-listitem-content-toprow">
        <span className="comment-show-listitem-content-username">username for {comment.id} &nbsp;&nbsp;</span>
        <span className="comment-show-listitem-content-timestamp">_ days ago</span>
      </div>
      <span className="comment-show-listitem-content-body">{comment.body}</span>
      <span className="comment-show-listitem-content-reply-like-bar">reply</span>
      <span className="comment-show-listitem-child-comments-button">View all # replies <span className="down-carrot">&or;</span></span>
    </div>
  </li>);
};

export default CommentListItem;
