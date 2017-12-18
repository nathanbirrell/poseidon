# == Schema Information
#
# Table name: weather_day_summaries
#
#  id                  :integer          not null, primary key
#  date_time           :datetime         not null
#  temp_min            :integer
#  temp_max            :integer
#  precis_code         :string
#  precis              :string
#  precis_overlay_code :string
#  spot_id             :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class WeatherDaySummary < ForecastModel
  belongs_to :spot

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::WeatherDaySummaryForecasts.fetch(spot)
    forecasts.save_entries
  end
end
