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

FactoryGirl.define do
  factory :feature do
    
  end
end
