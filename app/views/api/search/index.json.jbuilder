json.set! 'results' do
  @results.each do |result|
    json.set! result.id do
      json.extract! result, :title, :id, :description, :views, :uploader_id, :created_at, :length, :views, :comment_ids
      json.thumbnail_image_url url_for(result.thumbnail_image('search'))
    end
  end

end

json.set! 'users' do
  @results.each do |result|
    json.set! result.user.id do
      json.partial! "api/users/non-signed-in_user", user: result.user
    end
  end
end
