# NOTE: forced plural on this model because the word "precis" is both singular
#   and plural form
class WeatherPrecis < WeatherForecast
  belongs_to :spot

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::WeatherPrecisForecasts.fetch(spot)
    forecasts.save_entries
  end
end
