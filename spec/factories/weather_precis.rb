# == Schema Information
#
# Table name: weather_precis
#
#  id                  :integer          not null, primary key
#  date_time           :datetime
#  precis_code         :string
#  precis              :string
#  precis_overlay_code :string
#  night               :boolean
#  spot_id             :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

FactoryGirl.define do
  factory :weather_preci, class: 'WeatherPrecis' do
    date_time "2017-12-04 12:14:57"
    precis_code "MyString"
    precis "MyString"
    precis_overlay_code "MyString"
    night false
    spot_id 1
  end
end
