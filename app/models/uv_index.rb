class UvIndex < WeatherForecast
  belongs_to :spot

  validates :uv_index, :inclusion => { :in => 0..20 }

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::UvIndexForecasts.fetch(spot)
    forecasts.save_entries
  end
end
