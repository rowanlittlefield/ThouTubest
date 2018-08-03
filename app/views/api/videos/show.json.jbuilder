json.partial! "api/videos/show", user: @user, displayed_video: @video, videos: @videos,  comments: @comments

if @likes
  json.set! 'likes' do
    @likes.each do |like|
      json.set! like.id do
        json.extract! like, :id, :likeable_type, :likeable_id, :is_dislike, :user_id
      end
    end
  end
end
