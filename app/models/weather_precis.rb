# NOTE: forced plural on this model because the word "precis" is both singular
#   and plural form
class WeatherPrecis < WeatherForecast
  belongs_to :spot
end
