# == Schema Information
#
# Table name: winds
#
#  id             :integer          not null, primary key
#  speed          :decimal(, )
#  direction      :integer
#  direction_text :string
#  date_time      :datetime
#  spot_id        :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Wind < WeatherForecast
  # default_scope { order(date_time: :desc) }
  require 'poseidon_math'
  belongs_to :spot

  def poseidon_math
    @poseidon_math ||= PoseidonMath.new
  end

  def dir_at_rating(rating)
    poseidon_math.value_given_rating(
      min_x: spot.wind_optimal_direction_max,
      max_x: spot.wind_optimal_direction_min,
      rating: rating
    )
  end

  def dir_rating
    return 0 unless direction
    poseidon_math.rating_given_x(
      min_x: spot.wind_optimal_direction_max,
      max_x: spot.wind_optimal_direction_min,
      x_value: direction
    )
  end

  def speed_at_rating(rating)
    poseidon_math.value_given_rating(
      min_x: spot.wind_optimal_strength_max_kmh,
      max_x: spot.wind_optimal_strength_min_kmh,
      rating: rating
    )
  end

  def speed_rating
    return 0 unless speed
    poseidon_math.rating_given_x(
      min_x: spot.wind_optimal_strength_max_kmh,
      max_x: spot.wind_optimal_strength_min_kmh,
      x_value: speed
    )
  end

  def wind_in_3_hours
    @wind_in_3_hours ||= Wind.in_three_hours(spot_id)
  end

  def rate_of_change_direction
    # FIXME
    # return 0 unless wind_in_3_hours
    # calculate_angle_between(wind_in_3_hours.current_variance.abs, current_variance.abs)
    25.0
  end

  def rate_of_change_speed
    return 0 unless wind_in_3_hours
    wind_in_3_hours.speed - speed
  end

  def rating
    weight_of_optimal_wind_direction = 0.8
    weight_of_optimal_wind_speed = 0.2
    rating = (dir_rating * weight_of_optimal_wind_direction) + (speed_rating * weight_of_optimal_wind_speed)
    rating.round(2)
  end
end
