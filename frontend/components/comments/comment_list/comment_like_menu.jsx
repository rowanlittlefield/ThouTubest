import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CommentLikeMenu = props => {
  return (
    <span className="comment-like-menu">
      <button className="comment-like-button"
        id="comment-like-button-likes"
         >
        <img id="comment-like-icon"
          className="comment-like-icon"
          src={window.likeIconSheet}/> <span>{}</span>
      </button>

      <button className="comment-like-button"
         id="comment-like-button-dislikes"
         >
        <img id="comment-dislike-icon"
          className="comment-like-icon"
          src={window.dislikeIconSheet}/> <span>{}</span>
      </button>
    </span>
  );
}

const msp = (state, ownProps) => {
  // const comment = state.entities.comments[ownProps.id];

  return {
   // comment: comment,
   // user: comment ? state.entities.users[comment.user_id] : null,
   // currentUserId: state.session.id
 };
};

const mdp = (dispatch, ownProps) => {
  return {
    // deleteComment: id => dispatch(deleteComment(id))
  };
};

export default withRouter(connect(msp, mdp)(CommentLikeMenu));
