require 'rest-client'
require 'pp'

# TODO: Abstract out PlanetOS API calls into an adapter OR lib? https://github.com/infinum/rails-handbook/blob/master/Design%20Patterns/Adapters.md
namespace :observations do
  task :update => :environment do

    update_swell()

  end
end

def update_swell
  # puts Spot.all.inspect # testing ActiveRecord integration
  planetos_api_key = '36cbaff072be400096158d9f71100c61' # TODO: Move this to an environment variable, very insecure tsk tsk!

  # TODO: add `wave_model_lat` and `wave_model_lon` to Spot, use those attrs here
  id = 1
  lat = '-38.608'
  lon = '144.501'

  # example response: https://goo.gl/yyL27S
  response = RestClient.get(
    'https://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point',
    {
      params: {
        'apikey' => planetos_api_key,
        'lat' => lat,
        'lon' => lon,
        'count' => '25',
        'context' => 'reftime_time_lat_lon'
      }
    }
  )

  entries = JSON.parse(response)["entries"]

  entries.each do |entry|
    datetime = DateTime.parse(entry["axes"]["time"])

    observation = Observation.where(
      axes_time: datetime,
      spot_id: id
    ).first_or_initialize

    observation.spot_id = id
    observation.axes_time = datetime
    observation.axes_reftime = DateTime.parse(entry["axes"]["reftime"])
    observation.axes_lat = entry["axes"]["latitude"]
    observation.axes_lon = entry["axes"]["longitude"]
    observation.swell_size_metres = entry["data"]["Significant_height_of_combined_wind_waves_and_swell_surface"]
    observation.swell_period_seconds = entry["data"]["Primary_wave_mean_period_surface"]
    observation.swell_direction_degrees = entry["data"]["Primary_wave_direction_surface"]
    observation.save
  end

  # Pretty-print the hash if you want to inspect it
  # pp observation_result
end

private

# TODO: migrate this into a utility file with whatever else should be from this file
def degToCompass(num)
  val = (num / 22.5) + 0.5
  arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
  arr[(val % 16)]
end
