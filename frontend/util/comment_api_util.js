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

export const createComment = comment => (
  $.ajax({
    url: 'api/comments',
    method: 'POST',
    data: comment
    })
);

export const deleteComment = id => (
  $.ajax({
    url: `api/comments/${id}`,
    method: 'DELETE'
  })
);
