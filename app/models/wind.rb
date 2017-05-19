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
    dirMaxVariance = 25.0 #Need to get this from DB or calc
    dirKVar = 100.0
    # hVar = ((max - min)/2) + min
    dirHVar = 0.0

    # pass in known coord to determin var a value, (maxVariance, 75)
    dirAVar = (75 - 100)/((dirMaxVariance - dirHVar)**2)

    dirCurrentVariance = 35.0 #need to calc, variance of direction compared to optimal wind dir
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

    speedRating = speedAVar * ((speedMin - speedHVar)**2) + speedKVar

    puts("Parabolic speedAVar=#{speedAVar} speedHVar=#{speedHVar} speedRating=#{speedRating}")

    x = spot.wind_optimal_direction_min_degrees
    y = direction

    # TODO: clean me (remove logs)

    puts("Calculating angle between x=#{x} and y=#{y} = #{calculate_angle_between(x, y)}")

    puts("is_angle_inside_range target=#{direction} + min=#{spot.wind_optimal_direction_min_degrees} + max=#{spot.wind_optimal_direction_max_degrees} ?")

    rating = speedRating
    puts("wind_rating: #{rating.to_s}")
    rating.round(2)
  end
end
