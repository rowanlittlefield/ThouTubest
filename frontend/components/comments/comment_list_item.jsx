import React from 'react';
import { Link } from 'react-router-dom';

const CommentListItem = ({comment}) => {

  return (<li className="comment-listitem">
    <img className="comment-show-listitem-image" width="40px" height="40px"/>
    <div className="comment-show-listitem-content">
      <div className="comment-show-listitem-content-toprow">
        <span className="comment-show-listitem-content-username">username for {comment.id} &nbsp;&nbsp;</span>
        <span>_ days ago</span>
      </div>
      <span>{comment.body}</span>
    </div>
  </li>);
};

export default CommentListItem;
