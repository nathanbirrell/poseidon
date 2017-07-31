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
  belongs_to :spot

  def size
    # Swell size is *always* the model size by the coefficient, thus calibrating
    #   the spot to it's nearest model reading.
    self[:size] * spot.wave_model_size_coefficient
  end

  def dir_at_rating(rating)
    dir_max = spot.swell_optimal_direction_max
    dir_min = spot.swell_optimal_direction_min
    dir_k_var = 100.0
    dir_h_var = ((dir_max - dir_min) / 2) + dir_min
    dir_a_var = (75 - 100) / ((dir_min - dir_h_var)**2)

    q_i = 2 * dir_a_var * dir_h_var
    q_ii = (-2 * dir_a_var * dir_h_var)**2
    q_iii = 4 * dir_a_var * (dir_a_var * (dir_h_var**2) + dir_k_var - rating)
    my_sqrt = q_ii - q_iii
    s_a_r_right = (q_i - Math.sqrt(my_sqrt.to_f)) / (2 * dir_a_var)
    s_a_r_left = (q_i + Math.sqrt(my_sqrt.to_f)) / (2 * dir_a_var)
    {
      left: s_a_r_left,
      right: s_a_r_right
    }
  end

  def dir_rating
    return 0 unless direction
    # vertex quad formula y = a(x-h)^2 + k
    # a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    dir_max = spot.swell_optimal_direction_max
    dir_min = spot.swell_optimal_direction_min
    dir_k_var = 100.0
    dir_h_var = ((dir_max - dir_min) / 2) + dir_min

    # pass in known coord to determin var a value, (dir_min, 75)
    dir_a_var = (75 - 100) / ((dir_min - dir_h_var)**2)

    # plug in current direction as x value
    dir_rating = dir_a_var * ((direction - dir_h_var)**2) + dir_k_var

    if dir_rating.negative?
      dir_rating = 0
    end

    dir_rating
  end

  def size_at_rating(rating)
    size_max = spot.swell_optimal_size_max_metres
    size_min = spot.swell_optimal_size_min_metres
    size_k_var = 100.0
    size_h_var = ((size_max - size_min) / 2) + size_min
    size_a_var = (75 - 100) / ((size_min - size_h_var)**2)

    q_i = 2 * size_a_var * size_h_var
    q_ii = (-2 * size_a_var * size_h_var)**2
    q_iii = 4 * size_a_var * (size_a_var * (size_h_var**2) + size_k_var - rating)
    my_sqrt = q_ii - q_iii
    s_a_r_right = (q_i - Math.sqrt(my_sqrt.to_f)) / (2 * size_a_var)
    s_a_r_left = (q_i + Math.sqrt(my_sqrt.to_f)) / (2 * size_a_var)
    {
      left: s_a_r_left,
      right: s_a_r_right
    }
  end

  def size_rating
    return 0 unless size
    # use vertex quad formula y = a(x-h)^2 + k
    # a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    size_max = spot.swell_optimal_size_max_metres
    size_min = spot.swell_optimal_size_min_metres
    size_k_var = 100.0
    size_h_var = ((size_max - size_min) / 2) + size_min

    # pass in known coord to determine var a value, (sizeMin, 75)
    size_a_var = (75 - 100) / ((size_min - size_h_var)**2)

    size_rating = size_a_var * ((size - size_h_var)**2) + size_k_var

    if size_rating.negative?
      size_rating = 0
    end

    size_rating
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
