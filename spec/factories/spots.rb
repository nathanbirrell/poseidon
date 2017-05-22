# == Schema Information
#
# Table name: spots
#
#  id                                   :integer          not null, primary key
#  name                                 :string
#  description                          :string
#  season                               :string
#  created_at                           :datetime         not null
#  updated_at                           :datetime         not null
#  latitude                             :decimal(10, 6)
#  longitude                            :decimal(10, 6)
#  image                                :string
#  region_id                            :integer
#  tide_optimal_min_metres              :decimal(, )
#  tide_optimal_max_metres              :decimal(, )
#  swell_optimal_size_min_metres        :decimal(, )
#  swell_optimal_size_max_metres        :decimal(, )
#  swell_optimal_period_seconds         :decimal(, )
#  wind_optimal_strength_min_kmh        :decimal(, )
#  wind_optimal_strength_max_kmh        :decimal(, )
#  wave_model_lat                       :decimal(, )
#  wave_model_lon                       :decimal(, )
#  willyweather_location_id             :integer
#  swell_optimal_direction              :decimal(, )
#  swell_optimal_direction_max_variance :decimal(, )
#  wind_optimal_direction               :decimal(, )
#  wind_optimal_direction_max_variance  :decimal(, )
#

FactoryGirl.define do
  factory :spot do
    name "MyString"
    description "MyString"
    optimal_wind_direction "MyString"
    optimal_swell_direction "MyString"
    season "MyString"
  end
end
