class NOAAClient
    attr_reader :forecasts

    def initialize(spot)
        # FIXME -- CHECK HERE THAT API KEY is set!
        @spot = spot
        @endpoint = 'https://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point'
        @days_to_forecast = 10
        @forecasts = []
    end

    def fetch
        response = get_from_planetos
        response = JSON.parse(response)
        @forecasts = response['entries']
    end

    def save
        @forecasts.each do |forecast|
            save_forecast(forecast)
        end
    end

    private

    def get_from_planetos
        # example response: https://goo.gl/yyL27S
        RestClient.get(
            @endpoint,
            {
                params: {
                    'apikey' => ENV['PLANETOS_API_KEY'],
                    'lat' => @spot.wave_model_lat,
                    'lon' => @spot.wave_model_lon,
                    'count' => count,
                    'context' => 'reftime_time_lat_lon'
                }
            }
        )
    end

    def save_forecast(forecast)
        datetime = DateTime.parse(forecast["axes"]["time"]) # DateTime provided in UTC :)

        record = Swell.where(
            date_time: datetime,
            spot_id: @spot.id
        ).first_or_initialize

        swell_size = forecast["data"]["Significant_height_of_combined_wind_waves_and_swell_surface"]

        puts("No swell height for #{@spot.name} (#{@spot.id}). Update swell model lat/long.") if swell_size.nil?

        record.size = swell_size
        record.period = forecast["data"]["Primary_wave_mean_period_surface"]
        record.direction = forecast["data"]["Primary_wave_direction_surface"]
        # TODO: we should probably store these fields, need to create the cols first though
        # record.axes_reftime = DateTime.parse(forecast["axes"]["reftime"])
        # record.axes_lat = forecast["axes"]["latitude"]
        # record.axes_lon = forecast["axes"]["longitude"]
        record.save
    end

    def count
        # 3 hourly intervals between records (8 per day)
        8 * @days_to_forecast
    end
end