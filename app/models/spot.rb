class Spot < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :region

  has_many :observations

  validates :name, presence: true

  # get latest latest_observation data
  def latest_observation
    Observation.where(spot_id: id).first
  end

  # caclulate a tide rating
  def tide_rating
    return 0 unless latest_observation

    rating = 0.0

    is_optimal_tide = is_between(latest_observation.tide_height_metres, tide_optimal_min_metres, tide_optimal_max_metres)
    rating += 1 if is_optimal_tide

    puts("tide_rating: #{rating.to_s}")
    rating
  end

  # calculate a wind rating
  def wind_rating
    return 0 unless latest_observation

    weight_of_optimal_wind_speed = 0.2
    weight_of_optimal_wind_direction = 0.8

    rating = 0.0

    is_optimal_wind_speed = is_between(latest_observation.wind_strength_kmh, wind_optimal_strength_min_kmh, wind_optimal_strength_max_kmh)
    rating += weight_of_optimal_wind_speed if is_optimal_wind_speed

    is_optimal_wind_direction = is_angle_inside_range(latest_observation.wind_direction_degrees, wind_optimal_direction_min_degrees, wind_optimal_direction_max_degrees)
    rating += weight_of_optimal_wind_direction if is_optimal_wind_direction

    puts("is_angle_inside_range target=#{latest_observation.wind_direction_degrees} + min=#{wind_optimal_direction_min_degrees} + max=#{wind_optimal_direction_max_degrees} ?")
    puts("is_optimal_wind_direction= #{is_optimal_wind_direction}")

    puts("wind_rating: #{rating.to_s}")
    rating
  end

  def swell_rating
    return 0 unless latest_observation

    weight_of_optimal_swell_height = 0.2
    weight_of_optimal_swell_direction = 0.8

    rating = 0.0

    is_optimal_swell_height = is_between(latest_observation.swell_size_metres, swell_optimal_size_min_metres, swell_optimal_size_max_metres)
    rating += weight_of_optimal_swell_height if is_optimal_swell_height

    is_optimal_swell_direction = is_angle_inside_range(latest_observation.swell_direction_degrees, swell_optimal_direction_min_degrees, swell_optimal_direction_max_degrees)
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
  end

  private

  # Need to calculate whether the observed angle is between optimal range.
  #   This is not as simple as the is_between() function, because of the 360°
  #   threshold of measuring angles, for example, given observed wind at 3° and
  #   an optimal range of 350° - 10°, 3 >= 350 = false, which is incorrect.
  #   Read more: http://stackoverflow.com/questions/11406189/determine-if-angle-lies-between-2-other-angles
  #
  #   TODO: Explain the logic inside this function better via comments
  def is_angle_inside_range(angle, range_min, range_max)
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

  def is_between(observation, param_min, param_max)
    (observation >= param_min) && (observation <= param_max)
  end
end
