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
file = EzDownload.open("http://s3.amazonaws.com/thoutubest-dev/cassowary.jpeg")
u1.photo.attach(io: file, filename: 'cassowary.jpeg')
u1.save!

Video.destroy_all
Comment.destroy_all

video_options_list = [
  {title: 'Test Video', description: 'Test video description',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "https://s3.amazonaws.com/thoutubest-dev/cassowary.jpeg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/test_video.mov"},

  {title: 'Hooded Oriole', description: 'A hodded oriole',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/hooded_oriole/hooded_oriole.jpg",
  film_url: "https://s3.amazonaws.com/thoutubest-dev/hooded_oriole/HOOR_20090731PM011200_os_ManyBirds-video-of-hooded-oriole.MP4"
  },

  {title: 'Buff Breasted Sandpiper', description: 'A really cool bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/buff_breasted_sandpiper/Buff-breasted_Sandpiper_c27-6-108_l_1.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/buff_breasted_sandpiper/BBSA_20090506AM080900_os_ManyBirds-video-of-buff-breasted-sandpiper.MP4"
  },

  {title: 'Spotted Owl', description: 'A really really cool bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/spotted_owl/spotted_owl_07.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/spotted_owl/SPOW_20090729AM101000_os_ManyBirds-video-of-spotted-owl.MP4"
  },

  {title: 'Shoebill Stork', description: 'A beautiful bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/shoebill/shoebill_meme.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/shoebill/Shoebill.mp4"
  },

  {title: 'Birds of Paradise', description: 'Many beautiful birds',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/bird_of_paradise/bird_of_paradise.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/bird_of_paradise/birds_of_paradise.mp4"
  },

  {title: 'Red winged black bird', description: 'A beautiful bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/redwing_blackbird/redwing_blackbird.jpeg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/redwing_blackbird/redwing_blackbird.mp4"
  },
]

def create_video_with_comments(v_opts, uploader)
  video = Video.new(
    title: v_opts[:title], description: v_opts[:description],
    video_url: v_opts[:video_url], thumbnail_url: v_opts[:thumbnail_url], views: rand(50...1000),
    uploader_id: uploader.id
   )
  thumbnail_image_file1 = EzDownload.open(v_opts[:image_url])
  video.thumbnail_image.attach(io: thumbnail_image_file1, filename: v_opts[:image_url].split('/').last)
  film_file1 = EzDownload.open(v_opts[:film_url])
  video.film.attach(io: film_file1, filename: v_opts[:film_url].split('/').last)
  video.save!
  video.get_video_length(v_opts[:film_url])

  2.times do
    c1 = Comment.new(
      user_id: uploader.id, video_id: video.id, body: "#{Faker::ChuckNorris.fact}"
    )
    c1.save!

    c2 = Comment.new(
      user_id: uploader.id, video_id: video.id, parent_comment_id: c1.id,
      body: "#{Faker::ChuckNorris.fact}"
    )
    c2.save!
  end
end

video_options_list.each do |video_option|
  create_video_with_comments(video_option, u1)
end
