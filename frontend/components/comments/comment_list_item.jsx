import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import CommentList from './comment_list';

const CommentListItem = ({comment, getComments, videoId, commentIds, type}) => {
  const displayChildComments = (childComments) => {
    if (Object.keys(childComments).length === 0 && childComments.constructor === Object) {
      return null;
    }
    return (<CommentList getComments={getComments}
       comments={childComments}
       commentIds={commentIds}
       videoId={videoId}
       type={'nested'}/>
      );
  };

  const renderChildComments = (comments, comment) => {
    const commy = document.getElementById(`comment-${comment.id}-reply-button-div`);
    const elClone = commy.cloneNode(true);
    commy.parentNode.replaceChild(elClone, commy);
    elClone.innerHTML = `<span id=comment-${comment.id}-hide-button
      class=${type}-comment-show-listitem-child-comments-button>Hide replies ^
      </span>`;

    const hideButton = document.getElementById(`comment-${comment.id}-hide-button`);
    debugger
    hideButton.addEventListener('click', () => {
      debugger;
      hideReplies(comment);
    });


    const childCommentList = displayChildComments(comments);
    const newDiv = document.createElement('div');
    newDiv.classList.add('nested-comment-list');
    elClone.appendChild(newDiv);

    ReactDOM.render(childCommentList, newDiv);

  };

  const hideReplies = comment => {
    const commy = document.getElementById(`comment-${comment.id}-reply-button-div`);
    const elClone = commy.cloneNode(true);
    commy.parentNode.replaceChild(elClone, commy);

    // elClone.innerHTML = `<span id=comment-${comment.id}-reply-button
    //   class=${type}-comment-show-listitem-child-comments-button>View all # replies ^
    //   </span>`;
    //   debugger
    debugger
    const replyButton = document.createElement('div');
    replyButton.setAttribute('id', `comment-${comment.id}-reply-button`);
    replyButton.classList.add(`${type}-comment-show-listitem-child-comments-button`);
    replyButton.innerHTML = 'View all # replies ^';
    debugger
    // const replyButton = document.getElementById(`comment-${comment.id}-reply-button`);
    replyButton.addEventListener('click', () => {
        getComments(videoId, comment.id).then((response) => {
          renderChildComments(response.comments, comment);
        })
      });
      debugger
    elClone.innerHTML = '';
    elClone.appendChild(replyButton);
  };

  return (<li className={`${type}-comment-listitem`}>
    <div className={`${type}-comment-listitem-div`}>
      <img className={`${type}-comment-show-listitem-image`} />
      <div className={`${type}-comment-show-listitem-content`}>
        <div className={`${type}-comment-show-listitem-content-toprow`}>
          <span className={`${type}-comment-show-listitem-content-username`}>username for {comment.id} &nbsp;&nbsp;</span>
          <span className={`${type}-comment-show-listitem-content-timestamp`}>_ days ago</span>
        </div>
        <span className={`${type}-comment-show-listitem-content-body`}>{comment.body}</span>
        <span className={`${type}-comment-show-listitem-content-reply-like-bar`}>reply</span>
        <div id={`comment-${comment.id}-reply-button-div`}>
          <span id={`comment-${comment.id}-reply-button`} onClick={() => {
              getComments(videoId, comment.id).then((response) => {
                renderChildComments(response.comments, comment);
              });
            }}
            className={`${type}-comment-show-listitem-child-comments-button`}>View all # replies<span className={`${type}-down-carrot`}>&or;</span>
          </span>
        </div>
      </div>
    </div>
  </li>);
};

export default CommentListItem;
