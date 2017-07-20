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
  belongs_to :spot

  def current_variance
    calculate_angle_between(direction, spot.swell_optimal_direction)
  end

  def size
    # Swell size is *always* the model size by the coefficient, thus calibrating
    #   the spot to it's nearest model reading.
    self[:size] * spot.wave_model_size_coefficient
  end

  def dir_rating
    return 0 unless direction
    weight_of_optimal_swell_direction = 0.3

    #========= CALC SWELL DIRECTION RATING ==========
    # use vertex quad formula y = a(x-h)^2 + k
    # where a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    dirMaxVariance = spot.swell_optimal_direction_max_variance
    dirKVar = 100.0
    dirHVar = 0.0

    # pass in known coord to determin var a value, (dirMaxVariance, 75)
    dirAVar = (75 - 100)/((dirMaxVariance - dirHVar)**2)

    dirRating = dirAVar * ((current_variance - dirHVar)**2) + dirKVar

    if dirRating < 0 then
      dirRating = 0
    end

    puts("Swell direction current_variance=#{current_variance} dirAVar=#{dirAVar} dirHVar=#{dirHVar} dirRating=#{dirRating}")
    puts("Swell dirRating= #{dirRating}")

    return dirRating
  end

  def size_rating
    return 0 unless size
    weight_of_optimal_swell_height = 0.7
    #========= CALC SWELL SIZE RATING ==========
    # use vertex quad formula y = a(x-h)^2 + k
    # where a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    sizeKVar = 100.0
    sizeMax = spot.swell_optimal_size_max_metres
    sizeMin = spot.swell_optimal_size_min_metres
    sizeHVar = ((sizeMax - sizeMin)/2) + sizeMin

    # pass in known coord to determine var a value, (sizeMin, 75)
    sizeAVar = (75 - 100)/((sizeMin - sizeHVar)**2)

    sizeRating = sizeAVar * ((size - sizeHVar)**2) + sizeKVar

    if sizeRating < 0 then
      sizeRating = 0
    end

    puts("Parabolic sizeAVar=#{sizeAVar} sizeHVar=#{sizeHVar} sizeRating=#{sizeRating}")
    puts("Swell sizeRating= #{sizeRating}")

    return sizeRating
  end

  def period_rating
    return 0 unless period
    # formula y = (ax^b)-a
    a = 1.4
    b = 1.7
    period_rating = (a * period**b) - a
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
    return 0 unless swell_in_3_hours
    calculate_angle_between(swell_in_3_hours.direction, direction)
  end
end
