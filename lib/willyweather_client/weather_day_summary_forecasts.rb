module WillyweatherClient
  class WeatherDaySummaryForecasts
    attr_reader :location, :forecasts

    def initialize(response, spot, client)
      @spot = spot
      @location = response['location']
      @forecasts = response['forecasts']['weather']['days']
      @client = client
    end

    def self.fetch(spot)
      client = WillyweatherClient::Client.new(spot.willyweather_location_id)
      response = client.fetch_forecasts('weather')
      new(response, spot, client)
    end

    def save_entries
      @forecasts.each do |day|
        day['entries'].each do |forecast|
          save_record(forecast)
        end
      end
    end

    def save_record(forecast)
      record = @client.get_or_create_record(
        WeatherDaySummary,
        @location['timeZone'],
        forecast['dateTime'],
        @spot.id
      )

      record.temp_min = forecast['min']
      record.temp_max = forecast['max']
      record.precis_code = forecast['precisCode']
      record.precis = forecast['precis']
      record.precis_overlay_code = forecast['precisOverlayCode']
      record.save
    end
  end
end