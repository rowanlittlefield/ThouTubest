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

class Video < ApplicationRecord
  validates :title, :description, :video_url, :thumbnail_url, :uploader_id, presence: true
  validate :ensure_film

  belongs_to :user,
    foreign_key: :uploader_id,
    class_name: :User

  has_one_attached :film
  has_one :custom_thumbnail_image
  has_many :comments, dependent: :destroy
  has_many :likes, as: :likeable

  include PgSearch

  pg_search_scope :search, against: [:title]

  def ensure_film
    unless self.film.attached?
      errors[:film] << "must be attached"
    end
  end

  def num_likes
    self.likes.where(is_dislike: false).count
  end

  def num_dislikes
    self.likes.where(is_dislike: true).count
  end

  def thumbnail_image
    if self.custom_thumbnail_image
      self.custom_thumbnail_image.image
    else
      self.film.preview(resize: "210x118")
    end
  end

  def add_view
    self.views += 1
    self.save
  end

  def get_video_length(alternative_url = nil)
    if alternative_url
      # movie = FFMPEG::Movie.new(alternative_url)
      # self.length = movie.duration

      self.length = extract_duration(alternative_url)
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

      # movie = FFMPEG::Movie.new(object_access_url)
      # self.length = movie.duration

      self.length = extract_duration(object_access_url)
      self.save
    end

  end

  def update_thumbnail(thumbnail_file)
    image = self.custom_thumbnail_image
    image.destroy if image
    if thumbnail_file
      ensure_thumbnail_image(thumbnail_file)
    end
  end

  def ensure_thumbnail_image(thumbnail_file)
    if thumbnail_file
      custom_thumbnail_image = CustomThumbnailImage.new
      custom_thumbnail_image.image.attach(io: thumbnail_file, filename: thumbnail_file.original_filename)
      self.custom_thumbnail_image = custom_thumbnail_image
      custom_thumbnail_image.save!
    end
  end

  private

  def extract_duration(url)
    output = `ffmpeg -i #{url} 2>&1`
    m_data = output.match("Duration: ([0-9]+):([0-9]+):([0-9]+).([0-9]+)")
    num_seconds = (m_data[1].to_i * 3600) + (m_data[2].to_i * 60) + (m_data[3].to_i)
    (num_seconds.is_a?(Integer) ? num_seconds : 0)
  end


end
