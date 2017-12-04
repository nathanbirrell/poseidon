# TODO: Abstract out PlanetOS API calls into an adapter OR lib? https://github.com/infinum/rails-handbook/blob/master/Design%20Patterns/Adapters.md

namespace :forecasts do
  task :update => :environment do
    Spot.update_forecasts
  end

  task :reset => :environment do
    # FIXME: add check here for dev environment!
    # Swell.delete_all
    # Wind.delete_all
    # Tide.delete_all
  end

  namespace :swells do
    task :update => :environment do
      Spot.all.each do |spot|
        Swell.update_forecasts(spot)
      end
    end
  end

  namespace :winds do
    task :update => :environment do
      Spot.all.each do |spot|
        Wind.update_forecasts(spot)
      end
    end
  end

  namespace :tides do
    task :update => :environment do
      Spot.all.each do |spot|
        Tide.update_forecasts(spot)
      end
    end
  end

  namespace :sunrisesunsets do
    task :update => :environment do
      Spot.all.each do |spot|
        SunriseSunset.update_forecasts(spot)
      end
    end
  end
end

namespace :weather do
  task :update => :environment do
    UvIndex.update_forecasts(spot)
    WeatherDaySummary.update_forecasts(spot)
    WeatherPrecis.update_forecasts(spot)
  end
end