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
  description: "Cape Schanck in Mornington Peninsula is a fairly exposed reef break that has reliable surf, although summer tends to be mostly flat. Offshore winds are from the northeast. Waves just as likely from local windswells as from distant groundswells and the optimum swell angle is from the southeast. A reef breaks left. Best around low tide. It's often crowded here. Watch out for dangerous rips.",
  season: 'March',
  image: 'https://www.wannasurf.com/spot/Australia_Pacific/Australia/VIC/Melbourne_East/cape_schanck/photo/photo_surf_Australia_VIC_Melbourne_East_cape_schanck_43b65780e5afc.jpg',
  latitude: -38.489189,
  longitude: 144.884256,
  region_id: region.id,
  tide_optimal_min_metres: 0.6,
  tide_optimal_max_metres: 1.3,
  swell_optimal_size_min_metres: 1.5,
  swell_optimal_size_max_metres: 4,
  swell_optimal_period_seconds: 18,
  swell_optimal_direction: 190,
  swell_optimal_direction_max_variance: 20,
  wind_optimal_strength_min_kmh: 0,
  wind_optimal_strength_max_kmh: 30,
  wind_optimal_direction: 5,
  wind_optimal_direction_max_variance: 20,
  wave_model_lat: -38.608,
  wave_model_lon: 144.501
)
puts "Created Spot #{spot.name}"

spot = Spot.first_or_create(
name: "Portsea Back Beach", description: "Portsea Back Beach in Mornington Peninsula is an exposed beach break that has very consistent waves and works all around the year. The best wind direction is from the northeast. Groundswells are more common than windswells and the optimum swell angle is from the southwest. The beach break provides left and right handers. Best around mid tide. It very rarely gets crowded here. Watch out for rips, locals and sharks.", season: "All year", latitude: "-38.340116", longitude: "144.698524", image: "http://www.surf-forecast.com/system/images/2960/large/Portsea-Back-Beach.jpg", region_id: region.id, tide_optimal_min_metres: "0.6", tide_optimal_max_metres: "1.2", swell_optimal_size_min_metres: "1.5", swell_optimal_size_max_metres: "4.0", swell_optimal_period_seconds: "18.0", swell_optimal_direction_min_degrees: 220, wind_optimal_direction_max_variance: 20, wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "30.0", wind_optimal_direction: 20, wind_optimal_direction_max_variance: 20, wave_model_lat: "-38.608", wave_model_lon: "144.501"
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
