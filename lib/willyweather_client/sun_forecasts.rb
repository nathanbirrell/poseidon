module WillyweatherClient
  class SunForecasts
    attr_reader :location, :forecasts

    def initialize(response, spot, client)
      @spot = spot
      @location = response['location']
      @forecasts = response['forecasts']['sunrisesunset']['days']
      @client = client
    end

    def self.fetch(spot)
      client = WillyweatherClient::Client.new(spot.willyweather_location_id)
      response = client.fetch_forecasts('sunrisesunset')
      new(response, spot, client)
    end

    def save_entries
      @forecasts.each do |day|
        day['entries'].each do |forecast|
          save_record(day['dateTime'], forecast)
        end
      end
    end

    def save_record(day, forecast)
      sun_record = @client.get_or_create_record(
        SunriseSunset,
        @location['timeZone'],
        day,
        @spot.id
      )

      sun_record.first_light = forecast['firstLightDateTime']
      sun_record.sunrise = forecast['riseDateTime']
      sun_record.sunset = forecast['setDateTime']
      sun_record.last_light = forecast['lastLightDateTime']

      sun_record.save
    end
  end
end