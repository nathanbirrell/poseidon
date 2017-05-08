# == Schema Information
#
# Table name: spots
#
#  id                                  :integer          not null, primary key
#  name                                :string
#  description                         :string
#  season                              :string
#  created_at                          :datetime         not null
#  updated_at                          :datetime         not null
#  latitude                            :decimal(10, 6)
#  longitude                           :decimal(10, 6)
#  image                               :string
#  region_id                           :integer
#  tide_optimal_min_metres             :decimal(, )
#  tide_optimal_max_metres             :decimal(, )
#  swell_optimal_size_min_metres       :decimal(, )
#  swell_optimal_size_max_metres       :decimal(, )
#  swell_optimal_period_seconds        :decimal(, )
#  swell_optimal_direction_min_degrees :integer
#  swell_optimal_direction_max_degrees :integer
#  wind_optimal_strength_min_kmh       :decimal(, )
#  wind_optimal_strength_max_kmh       :decimal(, )
#  wind_optimal_direction_min_degrees  :integer
#  wind_optimal_direction_max_degrees  :integer
#  wave_model_lat                      :decimal(, )
#  wave_model_lon                      :decimal(, )
#  willyweather_location_id            :integer
#

require 'weather_util'

class Spot < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :region

  has_many :tides
  has_many :winds
  has_many :swells

  validates :name, presence: true

  # get latest model readings
  def current_swell
    Swell.current(id)
  end
  def current_wind
    Wind.current(id)
  end
  def last_tide
    Tide.current(id)
  end

  # calculate current tide
  # TODO -- where do we put this code?
  def current_tide
    0
    # get tide max and min at location
    # get tide range at location
    # get baseline (minimum) time for tide at location


    # calculate difference from baseline time to current time (or target time) in multiples of 12, get modulus
    # if modulus < 6, it is rising (add to min), if > 6, subtract from max
    # use rule of 12ths to calc value to add/subtract. (no of 12ths x Maximum)

    # SINE CURVE
    # y = a.sin(b(x + l)) + v
    # where a = amplitude, b = period, l = left shift, v = vertical shift

    # tide_height = (tide_range/2)sin(1/b(x + 9b)) + (tide_range/2) where x is current time in hours (decimal) from a known minimum
    # --> y = r.sin((x/b) + 9) + r   where r = half tide range
    # 2pi.b = 12 --> solve for b to get the coefficient value to use for x in the above formula
    # (1/b).l = 9 --> l/b = 9 --> l = 9b --> have fed this back into formula above

    # From notepad
    # y = sin(bx) --> period = (1/b)2pi --> p = (2pi)/b --> b = 2pi/p --> where p = 12 --> b = pi/6
    # bl = 9 --> pi.l/6 = 9 --> 54 = pi.l --> l = 54/pi
  end

  def current_potential
    # calculate aggregate potential rating based on tide/wind/swell (as a percentage)
    aggregate = 0.0

    # aggregate += current_tide.rating / 3.0 # TODO: uncomment me when @Taylor completes current tide calcs
    aggregate += current_wind.rating / 3.0
    aggregate += current_swell.rating / 3.0

    aggregate = aggregate * 100
    aggregate.round(3)
  end
end
