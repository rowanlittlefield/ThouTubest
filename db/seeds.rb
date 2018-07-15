# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.destroy_all
db_type = "dev"

User.destroy_all

u1 = User.new(username: 'Todd', email: '1@aol.com', image_url: 'dummy', password: 'passwurd')
file = EzDownload.open("https://s3.amazonaws.com/thoutubest-#{db_type}/cassowary.jpeg")
u1.photo.attach(io: file, filename: 'cassowary.jpeg')
u1.save!

Video.destroy_all
Comment.destroy_all

6.times do
  v1 = Video.new(
    title: 'Test Video', description: 'Test Video description',
    video_url: 'dummy', thumbnail_url: 'dummy', views: 0,
    uploader_id: u1.id
   )
  thumbnail_image_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-#{db_type}/cassowary.jpeg")
  v1.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'cassowary.jpeg')
  film_file1 = EzDownload.open("https://s3.amazonaws.com/thoutubest-#{db_type}/test_video.mov")
  v1.film.attach(io: film_file1, filename: 'test_video.mov')
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
