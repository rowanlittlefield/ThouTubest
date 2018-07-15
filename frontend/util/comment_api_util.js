export const getComments = ({videoId, parentCommentId}) => (
  $.ajax({
    url: 'api/comments',
    method: 'GET',
    data: {
      comment: {
        video_id: videoId,
        parent_comment_id: parentCommentId
      }
    }
  })
);
