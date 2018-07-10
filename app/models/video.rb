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

class Video < ApplicationRecord
  validates :title, :description, :video_url, :thumbnail_url, :uploader_id, presence: true

  belongs_to :user,
    foreign_key: :uploader_id,
    class_name: :User
end
