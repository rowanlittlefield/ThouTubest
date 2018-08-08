json.comment do
  json.extract! @comment, :id, :body, :video_id, :parent_comment_id, :user_id, :child_comment_ids, :created_at
end

json.user do
  json.extract! @user, :id, :comment_ids
  json.image_url url_for(@user.photo)
end

json.video do
  json.extract! @video, :id, :comment_ids
end
