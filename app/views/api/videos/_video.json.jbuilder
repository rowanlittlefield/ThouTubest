json.extract! video, :id, :title, :description, :views
json.thumbnail_image_url url_for(video.thumbnail_image)
json.film_url url_for(video.film)
