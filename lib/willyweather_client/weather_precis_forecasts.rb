module WillyweatherClient
  class WeatherPrecisForecasts
    attr_reader :location, :forecasts

    def self.fetch(spot)
      client = WillyweatherClient::Client.new(spot.willyweather_location_id)
      response = client.fetch_forecasts('precis')
      new(response, spot, client)
    end

    def initialize(response, spot, client)
      @spot = spot
      @location = response['location']
      @forecasts = response['forecasts']['precis']['days']
      @client = client
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
        WeatherPrecis,
        @location['timeZone'],
        forecast['dateTime'],
        @spot.id
      )

      record.precis_code = forecast['precisCode']
      record.precis = forecast['precis']
      record.precis_overlay_code = forecast['precisOverlayCode']
      record.night = forecast['night']
      record.save
    end
  end
end