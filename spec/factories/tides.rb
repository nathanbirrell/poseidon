# == Schema Information
#
# Table name: tides
#
#  id         :integer          not null, primary key
#  tide_type  :string
#  height     :decimal(, )
#  spot_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  date_time  :datetime
#

FactoryGirl.define do
  factory :tide do
    type "MyString"
    height "9.99"
    date_time "MyString"
    spot nil
  end
end
