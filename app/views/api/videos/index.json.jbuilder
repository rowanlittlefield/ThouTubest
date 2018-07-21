id_list = []
json.set! 'videos' do
  @videos.each do |video|
    id_list << video.id
    json.set! video.id do
      # debugger
      json.extract! video, :id, :title, :views, :uploader_id, :comment_ids, :length
      json.film_url url_for(video.film)
      if video.custom_thumbnail_image
        json.thumbnail_image_url url_for(video.custom_thumbnail_image.image)
      else
        json.thumbnail_image_url url_for(video.film.preview(resize: "210x118"))
      end
    end
  end
end

json.set! 'videoList' do
  json.array! id_list
end

json.set! 'users' do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
      json.image_url url_for(user.photo)
    end
  end
end
