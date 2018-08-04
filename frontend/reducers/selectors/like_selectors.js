export const currentUserVideoLike = (video, currentUser, likes) => {
  if (currentUser.like_ids) {
    for(let i = 0; i < currentUser.like_ids.length; i++) {
      const like = likes[currentUser.like_ids[i]];
      if (like && like.likeable_type === 'Video' && like.user_id === currentUser.id &&
        like.likeable_id === video.id) {
        return like;
      }
    }
  }
  
  return null;
};
