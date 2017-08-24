module WillyweatherClient
  class WindForecasts
    attr_reader :location, :forecasts

    def initialize(response, spot)
      @spot = spot
      @location = response['location']
      @forecasts = response['forecasts']['wind']['days']
    end

    def self.fetch(spot)
      client = WillyweatherClient::Client.new(spot.willyweather_location_id)
      response = client.fetch_forecasts('wind')
      new(response, spot)
    end

    def save_entries
      @forecasts.each do |day|
        day['entries'].each do |forecast|
          save_record(forecast)
        end
      end
    end

    def save_record(forecast)
      Time.zone = @location['timeZone'] # Willyweather provides datetimes in the timezone of the location, we need to parse it into UTC
      forecast_datetime = Time.zone.parse(forecast['dateTime'])
      Time.zone = Rails.application.config.time_zone # Reset back to config setting

      wind_record = Wind.where(
        date_time: forecast_datetime.utc,
        spot_id: @spot.id
      ).first_or_initialize

      wind_record.speed = forecast['speed']
      wind_record.direction = forecast['direction']
      wind_record.direction_text = forecast['directionText']

      wind_record.save
    end
  end
end