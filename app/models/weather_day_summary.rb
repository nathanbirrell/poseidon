class WeatherDaySummary < WeatherForecast
  belongs_to :spot

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::WeatherDaySummaryForecasts.fetch(spot)
    forecasts.save_entries
  end
end
