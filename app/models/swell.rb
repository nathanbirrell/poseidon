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

  def rating
    return 0 unless size && direction && period
    weight_of_optimal_swell_height = 0.7
    weight_of_optimal_swell_direction = 0.3

    #========= CALC SWELL SIZE RATING ==========
    # use vertex quad formula y = a(x-h)^2 + k
    # where a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    sizeKVar = 100.0
    sizeMax = spot.swell_optimal_size_max_metres
    sizeMin = spot.swell_optimal_size_min_metres
    sizeHVar = ((sizeMax - sizeMin)/2) + sizeMin

    # pass in known coord to determine var a value, (sizeMin, 75)
    sizeAVar = (75 - 100)/((sizeMin - sizeHVar)**2)

    sizeRating = sizeAVar * ((sizeMin - sizeHVar)**2) + sizeKVar

    puts("Parabolic sizeAVar=#{sizeAVar} sizeHVar=#{sizeHVar} sizeRating=#{sizeRating}")

    #========= CALC SWELL DIRECTION RATING ==========
    # use vertex quad formula y = a(x-h)^2 + k
    # where a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    dirMaxVariance = 25.0 #Need to get this from DB or calc
    dirKVar = 100.0
    # hVar = ((max - min)/2) + min
    dirHVar = 0.0

    # pass in known coord to determin var a value, (dirMaxVariance, 75)
    dirAVar = (75 - 100)/((dirMaxVariance - dirHVar)**2)

    dirCurrentVariance = 35.0 #need to calc, variance of direction compared to optimal wind dir
    dirRating = dirAVar * ((dirCurrentVariance - dirHVar)**2) + dirKVar

    puts("Parabolic dirAVar=#{dirAVar} dirHVar=#{dirHVar} dirRating=#{dirRating}")

    rating = sizeRating
    puts("swell_rating: #{rating.to_s}")
    rating.round(2)
  end
end
