# TODO: Abstract out PlanetOS API calls into an adapter OR lib? https://github.com/infinum/rails-handbook/blob/master/Design%20Patterns/Adapters.md

namespace :forecasts do
  task :update => :environment do
    Spot.update_forecasts
  end

  task :reset => :environment do
    Swell.delete_all
    Wind.delete_all
    Tide.delete_all
  end
end

namespace :weather do
  task :update => :environment do
    UvIndex.update_forecasts(spot)
    WeatherDaySummary.update_forecasts(spot)
    WeatherPrecis.update_forecasts(spot)
  end
end