# == Schema Information
#
# Table name: swells
#
#  id         :integer          not null, primary key
#  size       :decimal(, )
#  period     :decimal(, )
#  direction  :integer
#  date_time  :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  spot_id    :integer
#

class Swell < WeatherForecast
  include Math
  require 'poseidon_math'
  belongs_to :spot

  def poseidon_math
    @poseidon_math ||= PoseidonMath.new
  end

  def size
    # Swell size is *always* the model size by the coefficient, thus calibrating
    #   the spot to it's nearest model reading.
    self[:size] * spot.wave_model_size_coefficient
  end

  def dir_at_rating(rating)
    data = poseidon_math.normalise_degrees(
      min_x: spot.swell_optimal_direction_min,
      max_x: spot.swell_optimal_direction_max,
      rating: rating
    )
    poseidon_math.value_given_rating(data)
  end

  def dir_rating
    return 0 unless direction
    data = poseidon_math.normalise_degrees(
      min_x: spot.swell_optimal_direction_min,
      max_x: spot.swell_optimal_direction_max,
      x_value: direction
    )
    poseidon_math.rating_given_x(data)
  end

  def size_at_rating(rating)
    poseidon_math.value_given_rating(
      min_x: spot.swell_optimal_size_min_metres,
      max_x: spot.swell_optimal_size_max_metres,
      rating: rating
    )
  end

  def size_rating
    return 0 unless size
    poseidon_math.rating_given_x(
      min_x: spot.swell_optimal_size_min_metres,
      max_x: spot.swell_optimal_size_max_metres,
      x_value: size
    )
  end

  def period_rating
    return 0 unless period
    # formula y = ax^b
    a = 1.4
    b = 1.7
    period_rating = a * period**b
    period_rating = 100.0 if period_rating > 100
    period_rating = 0.0 if period_rating.negative?
    period_rating
  end

  def rating
    weight_of_optimal_swell_height = 60 / 100
    weight_of_optimal_swell_direction = 30 / 100
    weight_of_swell_period = 10 / 100
    rating = (size_rating * weight_of_optimal_swell_height)
    rating += (dir_rating * weight_of_optimal_swell_direction)
    rating += (period_rating * weight_of_swell_period)
    rating.round(2)
  end

  def swell_in_3_hours
    @swell_in_3_hours ||= Swell.in_three_hours(spot_id)
  end

  def rate_of_change_size
    return 0 unless swell_in_3_hours
    swell_in_3_hours.size - size
  end

  def rate_of_change_direction
    # FIXME
    return 0 unless swell_in_3_hours
    # calculate_angle_between(swell_in_3_hours.current_variance.abs, current_variance.abs)
    25.0
  end
end
