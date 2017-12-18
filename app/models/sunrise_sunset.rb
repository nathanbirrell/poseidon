# == Schema Information
#
# Table name: sunrise_sunsets
#
#  id          :integer          not null, primary key
#  date_time   :datetime
#  spot_id     :integer
#  first_light :datetime
#  sunrise     :datetime
#  sunset      :datetime
#  last_light  :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class SunriseSunset < ForecastModel
  belongs_to :spot

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::SunForecasts.fetch(spot)
    forecasts.save_entries
  end
end
