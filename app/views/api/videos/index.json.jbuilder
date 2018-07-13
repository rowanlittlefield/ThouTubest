id_list = []
json.set! 'videos' do
  @videos.each do |video|
    id_list << video.id
    json.set! video.id do
      json.extract! video, :id, :title, :views, :uploader_id
      json.thumbnail_image_url url_for(video.thumbnail_image)
      json.film_url url_for(video.film)
    end
  end
end

json.set! 'videoList' do
  json.array! id_list
end