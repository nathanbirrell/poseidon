# == Schema Information
#
# Table name: observations
#
#  id                      :integer          not null, primary key
#  swell_size_metres       :decimal(, )
#  swell_period_seconds    :decimal(, )
#  swell_direction_degrees :integer
#  wind_strength_kmh       :decimal(, )
#  wind_direction_degrees  :integer
#  spot_id                 :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  tide_height_metres      :decimal(, )
#

FactoryGirl.define do
  factory :observation do
    swell_size_metres "9.99"
    swell_period_seconds "9.99"
    swell_direction_degrees 1
    wind_strength_kmh "9.99"
    wind_direction_degrees 1
    tide_height_metres "MyString"
    spot nil
  end
end
