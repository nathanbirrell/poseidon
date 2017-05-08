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
  def current_tide
    return 0
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

  # caclulate a tide rating
  def tide_rating
    return 0
    # return 0 unless current_tide && current_tide.height
    #
    # rating = 0.0
    #
    # is_optimal_tide = is_between(current_tide.height, tide_optimal_min_metres, tide_optimal_max_metres)
    # rating += 1 if is_optimal_tide
    #
    # puts("tide_rating: #{rating.to_s}")
    # rating
  end

  # calculate a wind rating
  def wind_rating
    return 0 unless current_wind && current_wind.speed && current_wind.direction

    weight_of_optimal_wind_speed = 0.2
    weight_of_optimal_wind_direction = 0.8

    rating = 0.0

    is_optimal_wind_speed = is_between(current_wind.speed, wind_optimal_strength_min_kmh, wind_optimal_strength_max_kmh)
    rating += weight_of_optimal_wind_speed if is_optimal_wind_speed

    is_optimal_wind_direction = is_angle_inside_range(current_wind.direction, wind_optimal_direction_min_degrees, wind_optimal_direction_max_degrees)
    rating += weight_of_optimal_wind_direction if is_optimal_wind_direction

    x = wind_optimal_direction_min_degrees
    y = current_wind.direction
    puts("Calculating angle between x=#{x} and y=#{y} = #{calculate_angle_between(x, y)}")

    puts("is_angle_inside_range target=#{current_wind.direction} + min=#{wind_optimal_direction_min_degrees} + max=#{wind_optimal_direction_max_degrees} ?")
    puts("is_optimal_wind_direction= #{is_optimal_wind_direction}")

    puts("wind_rating: #{rating.to_s}")
    rating
  end

  def swell_rating
    return 0 unless current_swell && current_swell.size && current_swell.direction && current_swell.period

    weight_of_optimal_swell_height = 0.7
    weight_of_optimal_swell_direction = 0.3

    rating = 0.0

    is_optimal_swell_height = is_between(current_swell.size, swell_optimal_size_min_metres, swell_optimal_size_max_metres)
    rating += weight_of_optimal_swell_height if is_optimal_swell_height

    is_optimal_swell_direction = is_angle_inside_range(current_swell.direction, swell_optimal_direction_min_degrees, swell_optimal_direction_max_degrees)
    rating += weight_of_optimal_swell_direction if is_optimal_swell_direction

    puts("swell_rating: #{rating.to_s}")
    rating
  end

  def current_potential
    # calculate aggregate potential rating based on tide/wind/swell (as a percentage)
    aggregate = 0.0

    aggregate += tide_rating / 3.0
    aggregate += wind_rating / 3.0
    aggregate += swell_rating / 3.0

    aggregate * 100.0
    aggregate.round(3) * 100
  end

  private

  def calculate_angle_between(x, y)
    # Math.atan2(Math.sin(x-y), Math.cos(x-y))
    a = x - y
    a -= 360 if a > 180
    a += 360 if a < -180
    a
  end

  # Need to calculate whether the observed angle is between optimal range.
  #   This is not as simple as the is_between() function, because of the 360°
  #   threshold of measuring angles, for example, given observed wind at 3° and
  #   an optimal range of 350° - 10°, 3 >= 350 = false, which is incorrect.
  #   Read more: http://stackoverflow.com/questions/11406189/determine-if-angle-lies-between-2-other-angles
  #
  #   TODO: Explain the logic inside this function better via comments
  def is_angle_inside_range(angle, range_min, range_max)
    # FIXME: Do NOT validate these values here, validate them on the ActiveRecord model attributes
    if (!is_between(angle, 1, 360) || !is_between(range_min, 1, 360) || !is_between(range_max, 1, 360))
      puts('Angles must be provided inside 1 - 360 degrees')
      return
    end

    # Make the angle from range_min to range_max to be <= 180 degrees
    real_angle = ((range_max - range_min) % 360 + 360) % 360
    # Swap the min/max range if it's > 180
    range_min, range_max = range_max, range_min if (real_angle >= 180)

    if range_min <= range_max
      return angle >= range_min && angle <= range_max
    else
      return angle >= range_min || angle <= range_max
    end
  end

  # Convenience function to check if `observation` is between the two params
  def is_between(observation, param_min, param_max)
    (observation >= param_min) && (observation <= param_max)
  end
end
