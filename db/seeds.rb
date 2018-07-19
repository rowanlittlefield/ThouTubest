# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.destroy_all
require 'streamio-ffmpeg'
User.destroy_all



u1 = User.new(username: 'Todd', email: '1@aol.com', image_url: 'dummy', password: 'passwurd')
file = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/cassowary.jpeg")
u1.photo.attach(io: file, filename: 'cassowary.jpeg')
u1.save!

Video.destroy_all
Comment.destroy_all

# video_options_list = [
#   {title: 'Hooded Oriole', description: 'A hodded oriole',
#   video_url: 'dummy', thumbnail_url: 'dummy', views: 300,
#   uploader_id: u1.id},
#
#
# ]

# def create_video_with_comments(video_options, u1)
#   video = Video.new(
#     title: 'Hooded Oriole', description: 'A hodded oriole',
#     video_url: 'dummy', thumbnail_url: 'dummy', views: 300,
#     uploader_id: u1.id
#    )
#   thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/hooded_oriole/hooded_oriole.jpg")
#   video.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'hooded_oriole.jpg')
#   film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/hooded_oriole/HOOR_20090731PM011200_os_ManyBirds-video-of-hooded-oriole.MP4")
#   video.film.attach(io: film_file1, filename: 'ARKive-video-467B76B0-1509-49D4-A5F0-B4C4D000E739.mov')
#   video.save!
#
#   3.times do
#     c1 = Comment.new(
#       user_id: u1.id, video_id: v1.id, body: 'top level comment yo'
#     )
#     c1.save!
#
#     c2 = Comment.new(
#       user_id: u1.id, video_id: v1.id, parent_comment_id: c1.id,
#       body: 'nested comment myan'
#     )
#     c2.save!
#   end
# end




6.times do
  v1 = Video.new(
    title: 'Test Video', description: 'Test Video description',
    video_url: 'dummy', thumbnail_url: 'dummy', views: 0,
    uploader_id: u1.id
   )
  thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/cassowary.jpeg")
  v1.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'cassowary.jpeg')
  film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/test_video.mov")
  v1.film.attach(io: film_file1, filename: 'test_video.mov')
  mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/test_video.mov")
  v1.length = mov.duration.to_i
  v1.save!

  3.times do
    c1 = Comment.new(
      user_id: u1.id, video_id: v1.id, body: 'top level comment yo'
    )
    c1.save!

    c2 = Comment.new(
      user_id: u1.id, video_id: v1.id, parent_comment_id: c1.id,
      body: 'nested comment myan'
    )
    c2.save!
  end
end

# v2 = Video.new(
#   title: 'Another cassowary', description: 'A cassowary',
#   video_url: 'dummy', thumbnail_url: 'dummy', views: 500,
#   uploader_id: u1.id
#  )
# thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/Cassowary_MissionBeach1.jpg")
# v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'Cassowary_MissionBeach1.jpg')
# film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/ARKive-video-467B76B0-1509-49D4-A5F0-B4C4D000E739.mov")
# v2.film.attach(io: film_file1, filename: 'ARKive-video-467B76B0-1509-49D4-A5F0-B4C4D000E739.mov')
# v2.save!

v2 = Video.new(
  title: 'Hooded Oriole', description: 'A hodded oriole',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 300,
  uploader_id: u1.id
 )
thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/hooded_oriole/hooded_oriole.jpg")
v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'hooded_oriole.jpg')
film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/hooded_oriole/HOOR_20090731PM011200_os_ManyBirds-video-of-hooded-oriole.MP4")
v2.film.attach(io: film_file1, filename: 'ARKive-video-467B76B0-1509-49D4-A5F0-B4C4D000E739.mov')
mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/hooded_oriole/HOOR_20090731PM011200_os_ManyBirds-video-of-hooded-oriole.MP4")
v2.length = mov.duration.to_i
v2.save!

3.times do
  c1 = Comment.new(
    user_id: u1.id, video_id: v2.id, body: 'top level comment yo'
  )
  c1.save!

  c2 = Comment.new(
    user_id: u1.id, video_id: v2.id, parent_comment_id: c1.id,
    body: 'nested comment myan'
  )
  c2.save!
end

v2 = Video.new(
  title: 'Buff Breasted Sandpiper', description: 'A really cool bird',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 340,
  uploader_id: u1.id
 )
thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/buff_breasted_sandpiper/Buff-breasted_Sandpiper_c27-6-108_l_1.jpg")
v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'Buff-breasted_Sandpiper_c27-6-108_l_1.jpg')
film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/buff_breasted_sandpiper/BBSA_20090506AM080900_os_ManyBirds-video-of-buff-breasted-sandpiper.MP4")
v2.film.attach(io: film_file1, filename: 'BBSA_20090506AM081500_os_ManyBirds-video-of-buff-breasted-sandpiper.MP4')
mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/buff_breasted_sandpiper/BBSA_20090506AM080900_os_ManyBirds-video-of-buff-breasted-sandpiper.MP4")
v2.length = mov.duration.to_i
v2.save!

3.times do
  c1 = Comment.new(
    user_id: u1.id, video_id: v2.id, body: 'top level comment yo'
  )
  c1.save!

  c2 = Comment.new(
    user_id: u1.id, video_id: v2.id, parent_comment_id: c1.id,
    body: 'nested comment myan'
  )
  c2.save!
end

v2 = Video.new(
  title: 'Spotted Owl', description: 'A really really cool bird',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 783,
  uploader_id: u1.id
 )
thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/spotted_owl/spotted_owl_07.jpg")
v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'spotted_owl_07.jpg')
film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/spotted_owl/SPOW_20090729AM101000_os_ManyBirds-video-of-spotted-owl.MP4")
v2.film.attach(io: film_file1, filename: 'SPOW_20090729AM101000_os_ManyBirds-video-of-spotted-owl.MP4')
mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/spotted_owl/SPOW_20090729AM101000_os_ManyBirds-video-of-spotted-owl.MP4")
v2.length = mov.duration.to_i
v2.save!

3.times do
  c1 = Comment.new(
    user_id: u1.id, video_id: v2.id, body: 'top level comment yo'
  )
  c1.save!

  c2 = Comment.new(
    user_id: u1.id, video_id: v2.id, parent_comment_id: c1.id,
    body: 'nested comment myan'
  )
  c2.save!
end



v2 = Video.new(
  title: 'Painted Redstart', description: 'An unremarkable bird',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 783,
  uploader_id: u1.id
 )
thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/painted_redstart/painted_redstart.jpg")
v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'painted_redstart.jpg')
film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/painted_redstart/PARE_20090729PM030500_os_ManyBirds-video-of-painted-redstart.MP4")
v2.film.attach(io: film_file1, filename: 'PARE_20090729PM030500_os_ManyBirds-video-of-painted-redstart.MP4')
mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/painted_redstart/PARE_20090729PM030500_os_ManyBirds-video-of-painted-redstart.MP4")
v2.length = mov.duration.to_i
v2.save!

3.times do
  c1 = Comment.new(
    user_id: u1.id, video_id: v2.id, body: 'top level comment yo'
  )
  c1.save!

  c2 = Comment.new(
    user_id: u1.id, video_id: v2.id, parent_comment_id: c1.id,
    body: 'nested comment myan'
  )
  c2.save!
end


v2 = Video.new(
  title: 'Shoebill Stork', description: 'An beautiful bird',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 783,
  uploader_id: u1.id
 )
thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/shoebill/shoebill_meme.jpg")
v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'shoebill_meme.jpg')
film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/shoebill/Shoebill.mp4")
v2.film.attach(io: film_file1, filename: 'Shoebill.mp4')
mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/shoebill/Shoebill.mp4")
v2.length = mov.duration.to_i
v2.save!

3.times do
  c1 = Comment.new(
    user_id: u1.id, video_id: v2.id, body: 'top level comment yo'
  )
  c1.save!

  c2 = Comment.new(
    user_id: u1.id, video_id: v2.id, parent_comment_id: c1.id,
    body: 'nested comment myan'
  )
  c2.save!
end

v2 = Video.new(
  title: 'Birds of Paradise', description: 'An beautiful bird',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 783,
  uploader_id: u1.id
 )
thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/bird_of_paradise/bird_of_paradise.jpg")
v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'bird_of_paradise.jpg')
film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/bird_of_paradise/birds_of_paradise.mp4")
v2.film.attach(io: film_file1, filename: 'birds_of_paradise.mp4')
mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/bird_of_paradise/birds_of_paradise.mp4")
v2.length = mov.duration.to_i
v2.save!

3.times do
  c1 = Comment.new(
    user_id: u1.id, video_id: v2.id, body: 'top level comment yo'
  )
  c1.save!

  c2 = Comment.new(
    user_id: u1.id, video_id: v2.id, parent_comment_id: c1.id,
    body: 'nested comment myan'
  )
  c2.save!
end

v2 = Video.new(
  title: 'Red winged black bird', description: 'A beautiful bird',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 783,
  uploader_id: u1.id
 )
thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/redwing_blackbird/redwing_blackbird.jpeg")
v2.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'redwing_blackbird.jpeg')
film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-dev/redwing_blackbird/redwing_blackbird.mp4")
v2.film.attach(io: film_file1, filename: 'redwing_blackbird.mp4')
mov = FFMPEG::Movie.new("https://s3.amazonaws.com/thoutubest-dev/redwing_blackbird/redwing_blackbird.mp4")
v2.length = mov.duration.to_i
v2.save!

3.times do
  c1 = Comment.new(
    user_id: u1.id, video_id: v2.id, body: 'top level comment yo'
  )
  c1.save!

  c2 = Comment.new(
    user_id: u1.id, video_id: v2.id, parent_comment_id: c1.id,
    body: 'nested comment myan'
  )
  c2.save!
end
