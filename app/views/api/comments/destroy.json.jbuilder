json.comment do
  json.extract! @comment, :id
end

json.user do
  json.extract! @user, :id, :comment_ids
  json.image_url url_for(@user.photo)
end

json.video do
  json.extract! @video, :id, :comment_ids
end
