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

  def variance_in_two_hours
    return 0 unless Wind.in_two_hours(spot_id).direction
    calculate_angle_between(direction, Wind.in_two_hours(spot_id).direction)
  end

  def rating
    return 0 unless speed && direction
    weight_of_optimal_wind_speed = 0.2
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

    #========= CALC WIND SPEED RATING ==========
    # use vertex quad formula y = a(x-h)^2 + k
    # where a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    speedKVar = 100.0
    speedMax = spot.wind_optimal_strength_max_kmh
    speedMin = spot.wind_optimal_strength_min_kmh
    speedHVar = ((speedMax - speedMin)/2) + speedMin

    # pass in known coord to determine var a value, (speedMin, 75)
    speedAVar = (75 - 100)/((speedMin - speedHVar)**2)

    speedRating = speedAVar * ((speed - speedHVar)**2) + speedKVar

    puts("Wind speed speedAVar=#{speedAVar} speedHVar=#{speedHVar} speedRating=#{speedRating}")
    puts("Wind speedRating= #{speedRating}")

    if speedRating < 0 then
      speedRating = 0
    end

    rating = (dirRating * weight_of_optimal_wind_direction) + (speedRating * weight_of_optimal_wind_speed)
    rating.round(2)
  end
end
