# == Schema Information
#
# Table name: swells
#
#  id         :integer          not null, primary key
#  size       :decimal(, )
#  period     :decimal(, )
#  direction  :integer
#  date_time  :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  spot_id    :integer
#

FactoryGirl.define do
  factory :swell do
    size "9.99"
    period "9.99"
    direction 1
    date_time "2017-05-05 10:58:33"
  end
end
