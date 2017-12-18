# == Schema Information
#
# Table name: weather_precis
#
#  id                  :integer          not null, primary key
#  date_time           :datetime
#  precis_code         :string
#  precis              :string
#  precis_overlay_code :string
#  night               :boolean
#  spot_id             :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

# NOTE: forced plural on this model because the word "precis" is both singular
#   and plural form
class WeatherPrecis < ForecastModel
  belongs_to :spot

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::WeatherPrecisForecasts.fetch(spot)
    forecasts.save_entries
  end
end
