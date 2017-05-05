require 'rest-client'
require 'pp'

WW_API_KEY = 'MTA5MTU5MWU3NThiZjg4ZjgxMDI2Nm'
PLANETOS_API_KEY = '36cbaff072be400096158d9f71100c61' # TODO: Move this to an environment variable, very insecure tsk tsk!

# TODO: Abstract out PlanetOS API calls into an adapter OR lib? https://github.com/infinum/rails-handbook/blob/master/Design%20Patterns/Adapters.md
namespace :observations do
  task :update => :environment do
    spots = Spot.all

    spots.each do |spot|
      update_swell_data(spot)
      update_wind_data(spot)
      update_tide_data(spot)
    end
  end

  task :reset => :environment do
    Observation.delete_all
    Wind.delete_all
    Tide.delete_all
  end
end

# TODO Move ALL these methods into their respective controllers OR into ActiveJobs

# TODO: Move this out of this rake task and bring it into the ActiveRecord model or the controller so that every time we create a Spot, we fetch this ID immediately.
def set_willyweather_location_id_if_needed((spot))
  return if spot.willyweather_location_id

  # For example: https://goo.gl/HkHDgF
  response = RestClient.get(
    "https://api.willyweather.com.au/v2/#{WW_API_KEY}/search.json",
    {
      params: {
        'lat' => spot.latitude,
        'lng' => spot.longitude,
        'units' => 'distance:km'
      }
    }
  )

  location = JSON.parse(response)['location']

  spot.willyweather_location_id = location['id'].to_s
  spot.save
end

private

# TODO Retrieve swell data via Willyweather as well for consistency? WW also uses NOAA.
def update_swell_data(spot)
  # example response: https://goo.gl/yyL27S
  response = RestClient.get(
    'https://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point',
    {
      params: {
        'apikey' => PLANETOS_API_KEY,
        'lat' => spot.wave_model_lat,
        'lon' => spot.wave_model_lon,
        'count' => '25',
        'context' => 'reftime_time_lat_lon'
      }
    }
  )

  entries = JSON.parse(response)["entries"]

  entries.each do |entry|
    save_swell_forecast_entry(spot.id, entry)
  end

  # Pretty-print the hash if you want to inspect it
  # pp observation_result
end

def update_wind_data(spot)
  response = get_willyweather_forecast(spot, 'wind')

  location_info = response['location']
  days = response['forecasts']['wind']['days']

  days.each do |day|
    forecasts = day['entries']
    forecasts.each do |forecast|
      save_wind_forecast_entry(spot.id, forecast, location_info['timeZone'])
    end
  end
end

def update_tide_data(spot)
  # TODO: this method
end

def save_swell_forecast_entry(spot_id, entry)
  datetime = DateTime.parse(entry["axes"]["time"])

  observation = Observation.where(
    axes_time: datetime,
    spot_id: spot_id
  ).first_or_initialize

  observation.spot_id = spot_id
  observation.axes_time = datetime
  observation.axes_reftime = DateTime.parse(entry["axes"]["reftime"])
  observation.axes_lat = entry["axes"]["latitude"]
  observation.axes_lon = entry["axes"]["longitude"]
  observation.swell_size_metres = entry["data"]["Significant_height_of_combined_wind_waves_and_swell_surface"]
  observation.swell_period_seconds = entry["data"]["Primary_wave_mean_period_surface"]
  observation.swell_direction_degrees = entry["data"]["Primary_wave_direction_surface"]
  observation.save
end

def save_wind_forecast_entry(spot_id, forecast, spot_timezone)
  Time.zone = spot_timezone # Willyweather provides datetimes in the timezone of the location, we need to parse it into UTC
  forecast_datetime = Time.zone.parse(forecast['dateTime'])
  Time.zone = Rails.application.config.time_zone # Reset back to config setting

  wind_record = Wind.where(
    date_time: forecast_datetime.utc,
    spot_id: spot_id
  ).first_or_initialize

  wind_record.speed = forecast['speed']
  wind_record.direction = forecast['direction']
  wind_record.direction_text = forecast['directionText']
  wind_record.date_time = forecast_datetime

  wind_record.save
end

def get_willyweather_forecast(spot, forecast)
  set_willyweather_location_id_if_needed(spot)

  # ie: https://goo.gl/xfJKpn
  response = RestClient.get(
    "https://api.willyweather.com.au/v2/#{WW_API_KEY}/locations/#{spot.willyweather_location_id}/weather.json",
    {
      params: {
        'forecasts' => forecast,
        'days' => 5
      }
    }
  )

  response = JSON.parse(response)
  response
end

# TODO: migrate this into a utility file with whatever else should be from this file. Maybe to custom_classes.rb for now?
def degToCompass(num)
  val = (num / 22.5) + 0.5
  arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
  arr[(val % 16)]
end
