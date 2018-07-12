# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
#
u1 = User.new(username: 'Todd', email: '1@aol.com', image_url: 'dummy', password: 'passwurd')
file1 = File.open('/Users/rowanlittlefield/Desktop/cassowary.jpeg')
u1.photo.attach(io: file1, filename: 'cassowary.jpeg')
u1.save!

Video.destroy_all

v1 = Video.new(
  title: 'Test Video', description: 'Test Video description',
  video_url: 'dummy', thumbnail_url: 'dummy', views: 0,
  uploader_id: u1.id
 )
thumbnail_image_file1 = File.open('/Users/rowanlittlefield/Desktop/cassowary.jpeg')
v1.thumbnail_image.attach(io: thumbnail_image_file1, filename: 'cassowary.jpeg')
film_file1 = File.open('/Users/rowanlittlefield/Desktop/test_video.mov')
v1.film.attach(io: film_file1, filename: 'test_video.mov')
v1.save!
