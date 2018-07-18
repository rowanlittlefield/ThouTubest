# == Schema Information
#
# Table name: comments
#
#  id                :bigint(8)        not null, primary key
#  user_id           :integer          not null
#  video_id          :integer          not null
#  parent_comment_id :integer
#  body              :text             not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :user
  belongs_to :video
  belongs_to :parent_comment,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    optional: true

  has_many :child_comments,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    dependent: :destroy
end
