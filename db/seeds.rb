# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = CreateAdminService.new.call
puts 'CREATED ADMIN USER: ' << user.email

spot_bells = Spot.find_or_initialize_by(name: 'Bells Beach')
spot_bells.description = 'Long right-hand point'
spot_bells.optimal_wind_direction = 'NNW'
spot_bells.optimal_swell_direction = 'SW'
spot_bells.season = 'March'
spot_bells.image = 'http://www.surfcoast.vic.gov.au/files/assets/public/tourism/images/bellsbeachlandscape.jpg'
spot_bells.lat = -38.3699279
spot_bells.lng = 144.2779936
spot_bells.save!
puts 'CREATED SPOT: ' << spot_bells.name
