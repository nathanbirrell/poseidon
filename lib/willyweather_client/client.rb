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
          'days' => 10
        }
      )

      JSON.parse(response)
    end

    def get_or_create_record(model, location_timezone, forecast_time, spot_id)
      Time.zone = location_timezone # Willyweather provides datetimes in the timezone of the location, we need to parse it into UTC
      forecast_datetime = Time.zone.parse(forecast_time)
      Time.zone = Rails.application.config.time_zone # Reset back to config setting

      model.where(
        date_time: forecast_datetime.utc,
        spot_id: spot_id
      ).first_or_initialize
    end
  end
end