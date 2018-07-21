# == Schema Information
#
# Table name: custom_thumbnail_images
#
#  id       :bigint(8)        not null, primary key
#  video_id :integer          not null
#

class CustomThumbnailImage < ApplicationRecord
  belongs_to :video
  has_one_attached :image
  validate :ensure_image

  def ensure_image
    unless self.image.attached?
      errors[:thumbnail_image] << "must be attached"
    end
  end
end
