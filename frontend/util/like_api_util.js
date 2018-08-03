export const createVideoLike = (currentUserId, videoId, isDislike) => (
  $.ajax({
    url: 'api/likes',
    method: 'POST',
    data: {
      like: {
        user_id: currentUserId,
        likeable_id: videoId,
        is_dislike: isDislike,
        likeable_type: 'Video'
      }
    }
  })
);

export const updateLike = (id, is_dislike) => (
  $.ajax({
    url: 'api/likes',
    method: 'PATCH',
    data: {
      like: {
        id,
        is_dislike
      }
    }
  })
);
