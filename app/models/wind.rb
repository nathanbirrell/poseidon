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
  belongs_to :spot

  def current_variance
    return 0 unless direction
    calculate_angle_between(direction, spot.wind_optimal_direction)
  end

  def dir_rating
    return 0 unless direction
    weight_of_optimal_wind_direction = 0.8

    #========= CALC WIND DIRECTION RATING ==========
    # use vertex quad formula y = a(x-h)^2 + k
    # where a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    dirOptimum = spot.wind_optimal_direction
    dirMaxVariance =  spot.wind_optimal_direction_max_variance
    dirKVar = 100.0
    dirHVar = 0.0

    # pass in known coord to determin var a value, (maxVariance, 75)
    dirAVar = (75 - 100)/((dirMaxVariance - dirHVar)**2)

    dirRating = dirAVar * ((current_variance - dirHVar)**2) + dirKVar

    if dirRating < 0 then
      dirRating = 0
    end

    puts("Wind direction current_variance=#{current_variance} dirAVar=#{dirAVar} dirHVar=#{dirHVar} dirRating=#{dirRating}")
    puts("Wind dirRating= #{dirRating}")

    return dirRating
  end

  def speed_at_rating(rating)
    speed_max = spot.wind_optimal_strength_max_kmh
    speed_min = spot.wind_optimal_strength_min_kmh
    speed_k_var = 100.0
    speed_h_var = ((speed_max - speed_min) / 2) + speed_min
    speed_a_var = (75 - 100) / ((speed_min - speed_h_var)**2)

    q_i = 2 * speed_a_var * speed_h_var
    q_ii = (-2 * speed_a_var * speed_h_var)**2
    q_iii = 4 * speed_a_var * (speed_a_var * (speed_h_var**2) + speed_k_var - rating)
    my_sqrt = q_ii - q_iii
    s_a_r_right = (q_i - Math.sqrt(my_sqrt.to_f)) / (2 * speed_a_var)
    s_a_r_left = (q_i + Math.sqrt(my_sqrt.to_f)) / (2 * speed_a_var)
    {
      left: s_a_r_left,
      right: s_a_r_right
    }
  end

  def speed_rating
    return 0 unless speed
    # use vertex quad formula y = a(x-h)^2 + k
    # a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    speed_max = spot.wind_optimal_strength_max_kmh
    speed_min = spot.wind_optimal_strength_min_kmh
    speed_k_var = 100.0
    speed_h_var = ((speed_max - speed_min) / 2) + speed_min

    # pass in known coord to determine var a value, (speedMin, 75)
    speed_a_var = (75 - 100) / ((speed_min - speed_h_var)**2)

    speed_rating = speed_a_var * ((speed - speed_h_var)**2) + speed_k_var

    if speed_rating.negative?
      speed_rating = 0
    end

    speed_rating
  end

  def wind_in_3_hours
    @wind_in_3_hours ||= Wind.in_three_hours(spot_id)
  end

  def rate_of_change_direction
    return 0 unless wind_in_3_hours
    calculate_angle_between(wind_in_3_hours.current_variance.abs, current_variance.abs)
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
