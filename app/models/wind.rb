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

    dirCurrentVariance = calculate_angle_between(direction, dirOptimum)

    dirRating = dirAVar * ((dirCurrentVariance - dirHVar)**2) + dirKVar

    #puts("Parabolic min=#{min} max=#{max} direction=#{direction}")
    puts("Parabolic dirAVar=#{dirAVar} dirHVar=#{dirHVar} dirRating=#{dirRating}")

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

    puts("Parabolic speedAVar=#{speedAVar} speedHVar=#{speedHVar} speedRating=#{speedRating}")

    x = spot.wind_optimal_direction
    y = direction

    # TODO: clean me (remove logs)

    # puts("Calculating angle between x=#{x} and y=#{y} = #{calculate_angle_between(x, y)}")

    puts("is_angle_inside_range target=#{direction} + min=#{spot.wind_optimal_direction} + max=#{spot.wind_optimal_direction_max_variance} ?")

    rating = speedRating
    puts("wind_rating: #{rating.to_s}")
    rating.round(2)
  end
end
