# == Schema Information
#
# Table name: likes
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  likeable_type :string
#  likeable_id   :bigint(8)
#  is_dislike    :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Like < ApplicationRecord
  # validates :likeable_type, inclusion: {in: ['Comment', 'Video']}

  belongs_to :likeable, polymorphic: true
end
