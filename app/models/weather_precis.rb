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

  def to_builder
    Jbuilder.new do |row|
      row.id id
      row.date_time date_time
      row.spot_id spot_id
      row.precis_code precis_code
      row.precis precis
      row.precis_overlay_code precis_overlay_code
      row.night night
    end
  end
end
