export const filterComments = (
  currentVideoId, parentCommentId, commentIds, comments
) => {
  const filteredCommentIds = [];

  for(let i = 0; i < commentIds.length; i++) {
    const comment = comments[commentIds[i]];
    if(comment && `${comment.video_id}` === currentVideoId &&
      comment.parent_comment_id === parentCommentId) {
      filteredCommentIds.push(commentIds[i]);
    }
  }

  return filteredCommentIds;
};


// const currentVideoId = ownProps.match.params.videoId;
// const parentCommentId = ownProps.parentCommentId;
// const commentIds = (state.entities.videos[currentVideoId] ?
//   state.entities.videos[currentVideoId].comment_ids : []);
//
// for(let i = 0; i < commentIds.length; i++) {
//   const comment = state.entities.comments[commentIds[i]];
//   if(comment && `${comment.video_id}` === currentVideoId &&
//     comment.parent_comment_id === parentCommentId) {
//     filteredCommentIds.push(commentIds[i]);
//   }
// }
