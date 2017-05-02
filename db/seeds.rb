# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = CreateAdminService.new.call
puts 'Created Admin: ' << user.email

region = Region.first_or_create(
  name: 'Mornington Peninsula',
  description: 'East of Melbourne.',
  country: 'Australia',
  state: 'Victoria'
)
puts "Created Region #{region.name}"

spot = Spot.first_or_create(
  name: 'Cape Schanck',
  description: 'Long left-hand point',
  season: 'March',
  image: 'http://www.surfcoast.vic.gov.au/files/assets/public/tourism/images/bellsbeachlandscape.jpg',
  latitude: -38.489189,
  longitude: 144.884256,
  region_id: region.id,
  tide_optimal_min_metres: 0.6,
  tide_optimal_max_metres: 1.3,
  swell_optimal_size_min_metres: 1.5,
  swell_optimal_size_max_metres: 4,
  swell_optimal_period_seconds: 18,
  swell_optimal_direction_min_degrees: 120,
  swell_optimal_direction_max_degrees: 290,
  wind_optimal_strength_min_kmh: 0,
  wind_optimal_strength_max_kmh: 30,
  wind_optimal_direction_min_degrees: 320,
  wind_optimal_direction_max_degrees: 40,
  wave_model_lat: -38.608,
  wave_model_lon: 144.501
)
puts "Created Spot #{spot.name}"

# observation = Observation.first_or_create(
#   swell_size_metres: 1.3,
#   swell_period_seconds: 12,
#   swell_direction_degrees: 210,
#   wind_strength_kmh: 5.3,
#   wind_direction_degrees: 3,
#   tide_height_metres: 1.2,
#   spot_id: spot.id
# )
# puts "Created Observation for Spot #{spot.name} (swell: #{observation.swell_size_metres}m)"
