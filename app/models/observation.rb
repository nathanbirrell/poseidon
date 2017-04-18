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

class Observation < ApplicationRecord
  belongs_to :spot
end
