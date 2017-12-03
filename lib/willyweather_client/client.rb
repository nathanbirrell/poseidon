module WillyweatherClient
  class Client
    attr_reader :url

    def initialize(location_id)
      @location_id = location_id
      # FIXME: -- CHECK HERE THAT WILLYWEATHER_API_KEY is set!
    end

    def url
      "https://api.willyweather.com.au/v2/#{ENV['WILLYWEATHER_API_KEY']}/locations/#{@location_id}/weather.json"
    end

    def fetch_forecasts(type)
      response = RestClient.get(
        url.to_s,
        params: {
          'forecasts' => type,
          'days' => 10 # 8 Seems to be the maximum though, keeping as 10 to align with NOAA if max changes with Willyweather
        }
      )

      JSON.parse(response)
    end

    def get_or_create_record(model, location_timezone, forecast_time, spot_id)
      # Willyweather provides times in the timezone of the _location_, so we
      #   need to parse it into UTC, then reset back to app timezone
      Time.zone = location_timezone
      forecast_datetime = Time.zone.parse(forecast_time)
      Time.zone = Rails.application.config.time_zone

      model.where(
        date_time: forecast_datetime.utc,
        spot_id: spot_id
      ).first_or_initialize
    end
  end
end
