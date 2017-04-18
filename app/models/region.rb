# == Schema Information
#
# Table name: regions
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  country     :string
#  state       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Region < ApplicationRecord
  has_many :spot
end
