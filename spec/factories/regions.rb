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

FactoryGirl.define do
  factory :region do
    name "MyString"
    description "MyString"
    country "MyString"
    state "MyString"
  end
end
