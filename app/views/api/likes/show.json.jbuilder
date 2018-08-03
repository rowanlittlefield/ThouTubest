json.set! 'like' do
  json.extract! @like, :id, :likeable_id, :likeable_type, :is_dislike, :user_id
end

json.set! 'user' do
  json.extract! @user, :id, :like_ids
end

if @video
  json.set! 'video' do
    json.extract! @video, :id, :num_likes, :num_dislikes
  end
end
