json.set! 'user' do
  json.partial! "api/users/user", user: @user
end

if @likes
  json.set! 'likes' do
    @likes.each do |like|
      json.set! like.id do
        json.extract! like, :id, :likeable_type, :likeable_id, :is_dislike
      end
    end
  end
end
