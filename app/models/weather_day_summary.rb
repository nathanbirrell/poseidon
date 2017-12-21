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

  def to_builder
    Jbuilder.new do |row|
      row.id id
      row.date_time date_time
      row.spot_id spot_id
      row.temp_min temp_min
      row.temp_max temp_max
      row.precis_code precis_code
      row.precis precis
      row.precis_overlay_code precis_overlay_code
    end
  end
end
