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

# u1 = User.new(username: 'Todd', email: '1@aol.com', image_url: 'dummy', password: 'passwurd')
# file = EzDownload.open("http://s3.amazonaws.com/thoutubest-dev/cassowary.jpeg")
# u1.photo.attach(io: file, filename: 'cassowary.jpeg')
# u1.save!

user_options_list = [
  {username: 'Cassowary', email: '1@aol.com', password: 'passwurd',
  img_url: "http://s3.amazonaws.com/thoutubest-dev/cassowary.jpeg"},

  {username: 'Penguin', email: '2@aol.com', password: 'passwurd',
  img_url: "https://s3.amazonaws.com/thoutubest-dev/users/penguin.jpg"},

  {username: 'Cardinal', email: '3@aol.com', password: 'passwurd',
  img_url: "https://s3.amazonaws.com/thoutubest-dev/users/cardinal.jpg"},

  {username: 'Pelican', email: '4@aol.com', password: 'passwurd',
  img_url: "https://s3.amazonaws.com/thoutubest-dev/users/pelican.jpg"},

  {username: 'Birdman', email: '5@aol.com', password: 'passwurd',
  img_url: "https://s3.amazonaws.com/thoutubest-dev/users/Birdman.jpg"}

]

def create_user(u_opts)
  user = User.new(username: u_opts[:username], email: u_opts[:email],
    image_url: 'dummy', password: u_opts[:password])
  file = EzDownload.open(u_opts[:img_url])
  user.photo.attach(io: file, filename: u_opts[:img_url].split('/').last)
  user.save!
  user
end

user_objects = user_options_list.map do |user_options|
  create_user(user_options)
end

Video.destroy_all
Comment.destroy_all

video_options_list = [
  {title: 'Test Video', description: 'Test video description',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/cassowary.jpeg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/test_video.mov"},

  {title: 'Hooded Oriole', description: 'A hodded oriole',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/hooded_oriole/hooded_oriole.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/hooded_oriole/HOOR_20090731PM011200_os_ManyBirds-video-of-hooded-oriole.MP4"
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

  {title: 'Magnificent Riflebird', description: 'A really beautiful bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/magnificent_rifle_bird/bird_of_paradise.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/magnificent_rifle_bird/magnificent_riflebird.mp4"
  },

  {title: 'Red winged black bird', description: 'A beautiful bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/redwing_blackbird/redwing_blackbird.jpeg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/redwing_blackbird/redwing_blackbird.mp4"
  },

  {title: 'Arizona woodpecker', description: 'A nice looking bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/arizona_woodpecker/Arizona_woodpecker.JPG",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/arizona_woodpecker/ARWO_20090731PM012000_os_ManyBirds-video-of-arizona-woodpecker.MP4"
  },

  {title: 'Violet-crowned hummingbird', description: 'A nice looking bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/purple-crowned-hummingbird/Purple-crowned_hummingbird.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/purple-crowned-hummingbird/VCHU_20090730PM033200_os_ManyBirds-video-of-violet-crowned-hummingbird.MP4"
  },

  {title: 'Rooster', description: 'a cooooooooool bird',
  video_url: 'dummy', thumbnail_url: 'dummy',
  image_url: "http://s3.amazonaws.com/thoutubest-dev/rooster/rooster.jpg",
  film_url: "http://s3.amazonaws.com/thoutubest-dev/rooster/Pexels+Videos+4644.mp4"
  }

]

def create_video_with_comments(v_opts, users)
  uploader = users.sample

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
      user_id: users.sample.id, video_id: video.id, body: "#{Faker::ChuckNorris.fact}"
    )
    c1.save!

    c2 = Comment.new(
      user_id: users.sample.id, video_id: video.id, parent_comment_id: c1.id,
      body: "#{Faker::ChuckNorris.fact}"
    )
    c2.save!
  end
end

video_options_list.each do |video_options|
  create_video_with_comments(video_options, user_objects)
end
