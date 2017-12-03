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
end