# json.extract! user, :id, :username
json.extract! user, :id, :username, :email, :liked_video_ids, :like_ids
json.image_url url_for(user.photo)
