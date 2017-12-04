module WillyweatherClient
  class TideForecasts
    attr_reader :location, :forecasts

    def initialize(response, spot, client)
      @spot = spot
      @location = response['location']
      @forecasts = response['forecasts']['tides']['days']
      @client = client
    end

    def self.fetch(spot)
      client = WillyweatherClient::Client.new(spot.willyweather_location_id)
      response = client.fetch_forecasts('tides')
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
        Tide,
        @location['timeZone'],
        forecast['dateTime'],
        @spot.id
      )

      record.tide_type = forecast['type']
      record.height = forecast['height']
      record.save
    end
  end
end