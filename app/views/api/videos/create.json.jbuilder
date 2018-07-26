json.extract! @video, :id
json.partial! "api/videos/show", user: @user, displayed_video: @video, videos: @videos, comments: @comments
