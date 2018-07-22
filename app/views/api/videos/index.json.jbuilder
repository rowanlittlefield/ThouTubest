json.set! 'videos' do
  @videos.each do |video|
    json.set! video.id do
      json.extract! video, :id, :title, :views, :uploader_id, :comment_ids, :length, :created_at
      json.film_url url_for(video.film)
      json.thumbnail_image_url url_for(video.thumbnail_image)
    end
  end
end

json.set! 'users' do
  @videos.each do |video|
    user = video.user
    json.set! user.id do
      json.partial! "api/users/non-signed-in_user", user: user
    end
  end
end
