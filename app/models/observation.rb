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

  # We receive DateTime's from our 3rd party API in UTC format, so we can't
  #   have ActiveRecord assuming they're local/app timezone then
  #   auto-converting them.
  self.skip_time_zone_conversion_for_attributes = [:axes_time, :axes_reftime]
end
