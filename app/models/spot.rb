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

class Spot < ApplicationRecord
  include ActiveModel::Validations
  include Math

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
    Tide.last_tide(id)
  end
  def next_tide
    Tide.next_tide(id)
  end

  def tidal_range
    if last_tide.tide_type == 'low'
      low_tide = last_tide
      high_tide = next_tide
    elsif  last_tide.tide_type == 'high'
      low_tide = next_tide
      high_tide = last_tide
    end
    tide_range = high_tide.height - low_tide.height
  end

  # calculate current tide
  # TODO -- where do we put this code?
  def current_tide
    if last_tide.tide_type == 'low'
      low_tide = last_tide
      high_tide = next_tide
    elsif  last_tide.tide_type == 'high'
      low_tide = next_tide
      high_tide = last_tide
    end
    # get tide range at location
    # get baseline (minimum) time for tide at location

    # calculate difference from baseline time to current time (or target time) in multiples of 12, get modulus
    # if modulus < 6, it is rising (add to min), if > 6, subtract from max
    # use rule of 12ths to calc value to add/subtract. (no of 12ths x Maximum)

    # SINE CURVE
    # y = a.sin(b(x + l)) + v
    # where a = amplitude, b = period, l = left shift, v = vertical shift

    curr_tide = 0.0
    if last_tide.tide_type == 'low'
      curr_tide = tidal_range*sin(PI*1/6 - PI/2) + (tidal_range/2) + low_tide.height
    elsif last_tide.tide_type == 'high'
      curr_tide = tidal_range*sin(PI*1/6 + PI/2) + (tidal_range/2)
      #need to add + (last_tide.height - tide_range) instead of just + last_tide.height
    end
    return curr_tide.round(2)
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
