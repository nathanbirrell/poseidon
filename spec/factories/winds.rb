# == Schema Information
#
# Table name: winds
#
#  id             :integer          not null, primary key
#  speed          :decimal(, )
#  direction      :integer
#  direction_text :string
#  date_time      :datetime
#  spot_id        :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

FactoryGirl.define do
  factory :wind do
    speed "9.99"
    direction 1
    direction_text "MyString"
    date_time "2017-05-04 19:43:02"
    spot_id 1
  end
end
