import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentListItem from './comment_list_item';
import { filterComments } from '../../../reducers/selectors/comment_selectors';

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

export const msp = ({ entities }, { match, parentCommentId }) => {
  const currentVideoId = match.params.videoId;
  const commentIds = (entities.videos[currentVideoId] ?
    entities.videos[currentVideoId].comment_ids : []);

  const filteredCommentIds = filterComments(
    currentVideoId, parentCommentId, commentIds, entities.comments
  );

  return {
    currentVideoId: match.params.videoId,
    currentLevelCommentIds: filteredCommentIds
  };
};

export default withRouter(connect(msp)(CommentList));
