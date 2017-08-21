# == Schema Information
#
# Table name: tides
#
#  id         :integer          not null, primary key
#  tide_type  :string
#  height     :decimal(, )
#  spot_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  date_time  :datetime
#

class Tide < WeatherForecast
  # default_scope { order(date_time: :desc) }
  belongs_to :spot

  scope :last_tide, -> (spot_id) {
    where(spot_id: spot_id).where("date_time <= ?", Time.current).order(date_time: :desc).first
  }
  scope :next_tide, -> (spot_id) {
    where(spot_id: spot_id).where("date_time >= ?", Time.current).order(date_time: :asc).first
  }

  class << self
    def fetch_forecasts(spot)
      response = get_willyweather_forecast(spot, 'tides')
      location_info = response['location']
      days = response['forecasts']['tides']['days']

      days.each do |day|
        forecasts = day['entries']
        forecasts.each do |forecast|
          save_tide_forecast_entry(spot.id, forecast, location_info['timeZone'])
        end
      end
    end

    private

    def save_tide_forecast_entry(spot_id, forecast, spot_timezone)
      Time.zone = spot_timezone # Willyweather provides datetimes in the timezone of the location, we need to parse it into UTC
      forecast_datetime = Time.zone.parse(forecast['dateTime'])
      Time.zone = Rails.application.config.time_zone # Reset back to config setting

      tide_record = Tide.where(
        date_time: forecast_datetime.utc,
        spot_id: spot_id
      ).first_or_initialize

      tide_record.tide_type = forecast['type']
      tide_record.height = forecast['height']

      tide_record.save
    end
  end

  def to_builder
    Jbuilder.new do |tide|
      tide.id id
      tide.tide_type tide_type
      tide.height height
      tide.date_time date_time
    end
  end
end
