json.extract! video, :id, :title, :description, :views, :comment_ids
json.thumbnail_image_url url_for(video.thumbnail_image)
json.film_url url_for(video.film)
