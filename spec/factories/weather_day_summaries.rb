# == Schema Information
#
# Table name: weather_day_summaries
#
#  id                  :integer          not null, primary key
#  date_time           :datetime         not null
#  temp_min            :integer
#  temp_max            :integer
#  precis_code         :string
#  precis              :string
#  precis_overlay_code :string
#  spot_id             :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

FactoryGirl.define do
  factory :weather_day_summary do
    date_time "2017-12-04 12:06:05"
    temp_min 1
    temp_max 1
    precis_code "MyString"
    precis "MyString"
    precis_overlay_code "MyString"
    spot_id 1
  end
end
