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

  def to_builder
    Jbuilder.new do |row|
      row.id id
      row.date_time date_time
      row.spot_id spot_id
      row.first_light first_light
      row.sunrise sunrise
      row.sunset sunset
      row.last_light last_light
    end
  end
end
