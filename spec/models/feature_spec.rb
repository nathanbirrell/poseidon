# == Schema Information
#
# Table name: features
#
#  id            :integer          not null, primary key
#  key           :string           not null
#  value         :string
#  friendly_name :string
#  icon          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe Feature, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
