json.user do
  json.extract! user, :id, :username
  json.image_url url_for(user.photo)
end

json.video do
  json.extract! video, :id, :title, :description, :views, :comment_ids, :uploader_id
  json.film_url url_for(video.film)
  json.film_url url_for(video.film)
  if video.custom_thumbnail_image
    json.thumbnail_image_url url_for(video.custom_thumbnail_image.image)
  else
    json.thumbnail_image_url url_for(video.film.preview(resize: "210x118"))
  end
end
