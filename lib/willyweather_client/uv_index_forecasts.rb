module WillyweatherClient
  class UvIndexForecasts
    attr_reader :location, :forecasts

    def self.fetch(spot)
      client = WillyweatherClient::Client.new(spot.willyweather_location_id)
      response = client.fetch_forecasts('uv')
      new(response, spot, client)
    end

    def initialize(response, spot, client)
      @spot = spot
      @location = response['location']
      @forecasts = response['forecasts']['uv']['days']
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
        UvIndex,
        @location['timeZone'],
        forecast['dateTime'],
        @spot.id
      )

      record.uv_index = forecast['index']
      record.scale = forecast['scale']
      record.save
    end
  end
end