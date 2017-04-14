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

    is_optimal_tide = is_inside_optimal_params(latest_observation.tide_height_metres, tide_optimal_min_metres, tide_optimal_max_metres)
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

    is_optimal_wind_speed = is_inside_optimal_params(latest_observation.wind_strength_kmh, wind_optimal_strength_min_kmh, wind_optimal_strength_max_kmh)
    rating += weight_of_optimal_wind_speed if is_optimal_wind_speed

    is_optimal_wind_direction = is_inside_optimal_params(latest_observation.wind_direction_degrees, wind_optimal_direction_min_degrees, wind_optimal_direction_max_degrees)
    rating += weight_of_optimal_wind_direction if is_optimal_wind_direction

    puts("wind_rating: #{rating.to_s}")
    rating
  end

  def swell_rating
    # calculate a swell rating
    1
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

  def is_inside_optimal_params(observation, param_min, param_max)
    (observation > param_min) || (observation < param_max)
  end
end
