module WillyweatherClient
  class WindForecasts
    attr_reader :location, :forecasts

    def initialize(response, spot, client)
      @spot = spot
      @location = response['location']
      @forecasts = response['forecasts']['wind']['days']
      @client = client
    end

    def self.fetch(spot)
      client = WillyweatherClient::Client.new(spot.willyweather_location_id)
      response = client.fetch_forecasts('wind')
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
      wind_record = @client.get_or_create_record(
        Wind,
        @location['timeZone'],
        forecast['dateTime'],
        @spot.id
      )

      wind_record.speed = forecast['speed']
      wind_record.direction = forecast['direction']
      wind_record.direction_text = forecast['directionText']

      wind_record.save
    end
  end
end