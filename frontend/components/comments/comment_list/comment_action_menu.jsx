import React from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/comment_actions';

const CommentActionMenu = ({id, deleteComment, currentUserId, commentUserId, displayEditForm}) => {
  return(
    <div id={`${id}-comment-action-menu`}
      className={"comment-listitem-action-menu"}
      onClick={() => {
        if (id && currentUserId === commentUserId) {
          const dropDown = document.getElementById(`${id}-action-menu-dropdown`);
          dropDown.classList.toggle('hidden');
        }
      }}>
        <ul id="no-list-bullets">
          <li>
            <img src={window.tripleDotIcon} width="20px" height="20px" />
          </li>
          <li>
            <ul id={`${id}-action-menu-dropdown`}
              className={"action-menu-dropdown" + " hidden"}>
              <li>
                <ul>
                  <li onClick={displayEditForm}><span>Edit</span></li>
                  <li onClick={deleteComment.bind(null, id)}>
                    <span>Delete</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
    </div>
  );
}

const mdp = (dispatch, ownProps) => {
  return {
    deleteComment: id => dispatch(deleteComment(id))
  };
};


export default connect(null, mdp)(CommentActionMenu);
