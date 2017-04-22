require 'rest-client'
require 'pp'

# See example below for a task with access to ActiveRecord model :D
namespace :observations do
  task :update => :environment do
    # puts Spot.all.inspect # testing ActiveRecord integration
    planetos_api_key = '36cbaff072be400096158d9f71100c61' # TODO: Move this to an environment variable, very insecure tsk tsk!

    # endpoint = "https://api.planetos.com/v1/datasets/noaa_ww3_global_history/point?origin=dataset-details&lat=-38.489189&apikey=36cbaff072be400096158d9f71100c61&lon=144.884256&_ga=1.192165484.755588364.1489463050"
    response = RestClient.get(
      'https://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point',
      {
        params: {
          'apikey' => '36cbaff072be400096158d9f71100c61',
          'lat' => '-38.608',
          'lon' => '144.501',
          'count' => '5',
          'context' => 'reftime_time_lat_lon'
        }
      }
    )

    observation_result = JSON.parse(response)

    entries = observation_result["entries"]
    time = DateTime.parse(observation_result["stats"]["timeMin"])

    puts("Ref TIME (utc)= #{time}")
    puts("Ref TIME (local)= #{time.localtime}")

    entries.each do |entry|
      size = entry["data"]["Significant_height_of_combined_wind_waves_and_swell_surface"]
      time = DateTime.parse(entry["axes"]["time"]).localtime
      puts("At #{time}, the Significant_height_of_combined_wind_waves_and_swell_surface is #{size}m")
    end

    # Pretty-print the hash if you want to inspect it
    # pp observation_result
  end
end
