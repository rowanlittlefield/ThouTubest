# == Schema Information
#
# Table name: videos
#
#  id            :bigint(8)        not null, primary key
#  title         :string           not null
#  description   :text             not null
#  video_url     :string           not null
#  thumbnail_url :string           not null
#  views         :integer          default(0)
#  length        :integer
#  uploader_id   :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'streamio-ffmpeg'

class Video < ApplicationRecord
  validates :title, :description, :video_url, :thumbnail_url, :uploader_id, presence: true
  validate :ensure_thumbnail_image
  validate :ensure_film

  belongs_to :user,
    foreign_key: :uploader_id,
    class_name: :User

  has_many :comments, dependent: :destroy

  has_one_attached :film
  has_one_attached :thumbnail_image

  def ensure_thumbnail_image
    unless self.thumbnail_image.attached?
      errors[:thumbnail_image] << "must be attached"
    end
  end

  def ensure_film
    unless self.film.attached?
      errors[:film] << "must be attached"
    end
  end

  def get_video_length(alternative_url = nil)
    if alternative_url
      movie = FFMPEG::Movie.new(alternative_url)
      self.length = movie.duration
      self.save
    end

    aws_url = self.film.blob.service_url
    if ENV["RAILS_ENV"] == 'development'
      bucket = 'dev'
    elsif ENV["RAILS_ENV"] == 'production'
      bucket = 'prod'
    else
      return nil
    end

    if aws_url
      bucket_url = "http://s3.amazonaws.com/thoutubest-#{bucket}/"
      object_key = self.film.blob.key
      object_access_url = bucket_url + object_key
      movie = FFMPEG::Movie.new(object_access_url)
      self.length = movie.duration
      self.save
    end

  end


end
