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
    kVar = 100.0
    max = spot.swell_optimal_size_max_metres
    min = spot.swell_optimal_size_min_metres
    hVar = ((max - min)/2) + min

    # pass in known coord to determin var a value, (min, 75)
    aVar = (75 - 100)/((min - hVar)**2)

    sizeRating = aVar * ((size - hVar)**2) + kVar

    #puts("Parabolic min=#{min} max=#{max} direction=#{direction}")
    puts("Parabolic aVar=#{aVar} hVar=#{hVar} sizeRating=#{sizeRating}")

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
