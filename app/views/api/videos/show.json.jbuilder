json.set! 'videos' do
  json.set! @video.id do
      json.extract! @video, :id, :title, :description, :views, :comment_ids, :uploader_id, :created_at
      json.film_url url_for(@video.film)
  end

  @videos.each do |video|
    json.set! video.id do
      json.extract! video, :id, :title, :views, :uploader_id, :comment_ids, :length, :created_at
      json.film_url url_for(video.film)
      json.thumbnail_image_url url_for(video.thumbnail_image)
    end
  end
end

json.set! 'users' do
  json.set! @user.id do
    json.partial! "api/users/non-signed-in_user", user: @user
  end

  @videos.each do |video|
    user = video.user
    json.set! user.id do
      json.partial! "api/users/non-signed-in_user", user: user
    end
  end

  @comments.each do |comment|
    user = comment.user
    json.set! user.id do
      json.partial! "api/users/non-signed-in_user", user: @user
    end
  end
end

json.set! 'comments' do
  @video.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :video_id, :parent_comment_id, :user_id, :child_comment_ids
    end
  end
end
