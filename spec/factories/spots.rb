# == Schema Information
#
# Table name: spots
#
#  id                            :integer          not null, primary key
#  name                          :string
#  description                   :string
#  season                        :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  latitude                      :decimal(10, 6)
#  longitude                     :decimal(10, 6)
#  image                         :string
#  region_id                     :integer
#  tide_optimal_min_metres       :decimal(, )
#  tide_optimal_max_metres       :decimal(, )
#  swell_optimal_size_min_metres :decimal(, )
#  swell_optimal_size_max_metres :decimal(, )
#  wind_optimal_strength_min_kmh :decimal(, )
#  wind_optimal_strength_max_kmh :decimal(, )
#  wave_model_lat                :decimal(, )
#  wave_model_lon                :decimal(, )
#  willyweather_location_id      :integer
#  weighting_swell               :decimal(3, 2)
#  weighting_wind                :decimal(3, 2)
#  weighting_tide                :decimal(3, 2)
#  wave_model_size_coefficient   :decimal(4, 3)
#  swell_optimal_direction_min   :decimal(, )
#  swell_optimal_direction_max   :decimal(, )
#  wind_optimal_direction_min    :decimal(, )
#  wind_optimal_direction_max    :decimal(, )
#  hidden                        :boolean
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
