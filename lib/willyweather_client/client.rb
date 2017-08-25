module WillyweatherClient
    class Client
        attr_reader :url

        def initialize(location_id)
            @location_id = location_id
            # FIXME -- CHECK HERE THAT WILLYWEATHER_API_KEY is set!
        end

        def url
            "https://api.willyweather.com.au/v2/#{ENV['WILLYWEATHER_API_KEY']}/locations/#{@location_id}/weather.json"
        end

        def fetch_forecasts(type)
            response = RestClient.get(
            url.to_s,
            {
                params: {
                'forecasts' => type,
                'days' => 10
                }
            }
            )

            JSON.parse(response)
        end
    end
end