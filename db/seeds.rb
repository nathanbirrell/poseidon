# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = CreateAdminService.new.call
puts "Created Admin: #{user.email}"

region = Region.create_with(
  description: 'East of Melbourne.',
  country: 'Australia',
  state: 'Victoria'
).find_or_create_by(
  name: 'Mornington Peninsula'
)
puts "Created Region #{region.name}"

region = Region.create_with(
  description: 'West of Melbourne, along the Great Ocean Rd.',
  country: 'Australia',
  state: 'Victoria'
).find_or_create_by(
  name: 'Surf Coast'
)
puts "Created Region #{region.name}"

spot = Spot.create_with(
  name: 'Portsea Back Beach',
  description: 'Portsea Back Beach in Mornington Peninsula is an exposed beach break that has very consistent waves and works all around the year. Very bank-dependent and can get busy when the banks are working. The best wind direction is from the northeast. Groundswells are more common than windswells and the optimum swell angle is from the southwest. The beach break provides left and right handers. Best around mid tide. It very rarely gets crowded here. Watch out for rips, locals and sharks.',
  season: 'All year',
  latitude: '-38.340116',
  longitude: '144.698524',
  image: 'http://www.surf-forecast.com/system/images/2960/large/Portsea-Back-Beach.jpg',
  region_id: region.id,
  tide_optimal_min_metres: '0.0',
  tide_optimal_max_metres: '1.8',
  swell_optimal_size_min_metres: '0.4',
  swell_optimal_size_max_metres: '1.6',
  swell_optimal_period_seconds: '18.0',
  swell_optimal_direction: 225,
  swell_optimal_direction_max_variance: 50,
  wind_optimal_strength_min_kmh: '0.0',
  wind_optimal_strength_max_kmh: '30.0',
  wind_optimal_direction: 50,
  wind_optimal_direction_max_variance: 45,
  wave_model_lat: '-38.608',
  wave_model_lon: '144.501',
  weighting_swell: 0.4,
  weighting_wind: 0.4,
  weighting_tide: 0.2,
  wave_model_size_coefficient: 0.8
).find_or_create_by(
  name: 'Portsea Back Beach'
)
puts "Created Spot #{spot.name}"

spot = Spot.create_with(
  description: "Australia's most famous surf break and home of the Bells Beach Easter classic. The Southern Ocean's southwesterly swells refract around the Otways, clean up and reach the limestone reef creating one of the world's best point breaks. The point section under the cliffs is Rincon, then rolls through into The Bowl which holds big swells. Careful of getting caught inside on big days.", season: 'May-July', latitude: '-38.367745', longitude: '144.279932', image: 'https://www.surfcoast.vic.gov.au/files/assets/public/tourism/images/bellsbeachlandscape.jpg', region_id: 2, tide_optimal_min_metres: '0.2', tide_optimal_max_metres: '1.2', swell_optimal_size_min_metres: '0.5', swell_optimal_size_max_metres: '3.5', swell_optimal_period_seconds: '18.0', wind_optimal_strength_min_kmh: '0.0', wind_optimal_strength_max_kmh: '30.0', wave_model_lat: '-38.608', wave_model_lon: '144.501', willyweather_location_id: 11_642, swell_optimal_direction: '230.0', swell_optimal_direction_max_variance: '40.0', wind_optimal_direction: '330.0', wind_optimal_direction_max_variance: '40.0',
  weighting_swell: 0.4, weighting_wind: 0.4, weighting_tide: 0.2, wave_model_size_coefficient: 0.65
).find_or_create_by(
  name: 'Bells Beach'
)
puts "Created Spot #{spot.name}"

spot = Spot.create_with(
  description: "Very long (400-500m), winding righ-hand reef/point break wave. Breaks over rocky reef with two sections: Uppers (top section) and Lowers. Best when the swell is straight. Often gets crowded when it's on. Strong currents on big days and shallow on low low tides.", season: 'May-July', latitude: '-38.3675313', longitude: '144.2794396', image: 'https://i.ytimg.com/vi/VdKmXq5dFJs/maxresdefault.jpg', region_id: 2, tide_optimal_min_metres: '0.2', tide_optimal_max_metres: '1.2', swell_optimal_size_min_metres: '0.5', swell_optimal_size_max_metres: '3.5', swell_optimal_period_seconds: '18.0', wind_optimal_strength_min_kmh: '0.0', wind_optimal_strength_max_kmh: '30.0', wave_model_lat: '-38.608', wave_model_lon: '144.501', willyweather_location_id: 11_642, swell_optimal_direction: '230.0', swell_optimal_direction_max_variance: '40.0', wind_optimal_direction: '330.0', wind_optimal_direction_max_variance: '40.0',
  weighting_swell: 0.4, weighting_wind: 0.4, weighting_tide: 0.2, wave_model_size_coefficient: 0.65
).find_or_create_by(
  name: 'Winkipop'
)
puts "Created Spot #{spot.name}"

# NOTE: to populate forecast data (ie S/W/T data) run a `rails forecasts:update`
