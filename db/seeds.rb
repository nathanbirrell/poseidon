# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = CreateAdminService.new.call

Region.create!([
  {name: "Mornington Peninsula", description: "East of Melbourne.", country: "Australia", state: "Victoria"},
  {name: "Surf Coast", description: "West of Melbourne, along the Great Ocean Rd.", country: "Australia", state: "Victoria"},
  {name: "Phillip Island", description: "East of Melbourne", country: "Australia", state: "Victoria"}
])

Spot.create!([
  {name: "Portsea Back Beach", description: "Portsea Back Beach in Mornington Peninsula is an exposed beach break that has very consistent waves and works all around the year. Very bank-dependent and can get busy when the banks are working. The best wind direction is from the northeast. Groundswells are more common than windswells and the optimum swell angle is from the southwest. The beach break provides left and right handers. Best around mid tide. It very rarely gets crowded here. Watch out for rips, locals and sharks.", season: "All year", latitude: "-38.340116", longitude: "144.698524", image: "http://www.surf-forecast.com/system/images/2960/large/Portsea-Back-Beach.jpg", region_id: 1, tide_optimal_min_metres: "0.0", tide_optimal_max_metres: "1.8", swell_optimal_size_min_metres: "0.4", swell_optimal_size_max_metres: "1.6", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "15.0", wave_model_lat: "-38.608", wave_model_lon: "144.501", willyweather_location_id: 19278, weighting_swell: "0.4", weighting_wind: "0.4", weighting_tide: "0.2", wave_model_size_coefficient: "0.8", swell_optimal_direction_min: "185.0", swell_optimal_direction_max: "265.0", wind_optimal_direction_min: "355.0", wind_optimal_direction_max: "90.0"},
  {name: "Bells Beach", description: "Australia's most famous surf break and home of the Bells Beach Easter classic. The Southern Ocean's southwesterly swells refract around the Otways, clean up and reach the limestone reef creating one of the world's best point breaks. The point section under the cliffs is Rincon, then rolls through into The Bowl which holds big swells. Careful of getting caught inside on big days.", season: "May-July", latitude: "-38.367745", longitude: "144.279932", image: "https://www.surfcoast.vic.gov.au/files/assets/public/tourism/images/bellsbeachlandscape.jpg", region_id: 2, tide_optimal_min_metres: "0.2", tide_optimal_max_metres: "1.2", swell_optimal_size_min_metres: "1.2", swell_optimal_size_max_metres: "3.5", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "30.0", wave_model_lat: "-38.608", wave_model_lon: "144.501", willyweather_location_id: 11642, weighting_swell: "0.4", weighting_wind: "0.4", weighting_tide: "0.2", wave_model_size_coefficient: "0.7", swell_optimal_direction_min: "200.0", swell_optimal_direction_max: "250.0", wind_optimal_direction_min: "290.0", wind_optimal_direction_max: "0.0"},
  {name: "Winkipop", description: "Very long (400-500m), winding righ-hand reef/point break wave. Breaks over rocky reef with two sections: Uppers (top section) and Lowers. Best when the swell is straight. Often gets crowded when it's on. Strong currents on big days and shallow on low low tides.", season: "May-July", latitude: "-38.367531", longitude: "144.27944", image: "https://i.ytimg.com/vi/VdKmXq5dFJs/maxresdefault.jpg", region_id: 2, tide_optimal_min_metres: "0.2", tide_optimal_max_metres: "1.2", swell_optimal_size_min_metres: "1.2", swell_optimal_size_max_metres: "3.5", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "30.0", wave_model_lat: "-38.608", wave_model_lon: "144.501", willyweather_location_id: 11642, weighting_swell: "0.4", weighting_wind: "0.4", weighting_tide: "0.2", wave_model_size_coefficient: "0.7", swell_optimal_direction_min: "200.0", swell_optimal_direction_max: "250.0", wind_optimal_direction_min: "290.0", wind_optimal_direction_max: "0.0"},
  {name: "The Bluff, 13th Beach", description: "Steep, barrelling lefts/rights when the banks are right. Often peaky, breaking on sandy reef bottom. Long stretch of beach, can get crowded. Find it opposite the shipping beacon.", season: "Winter", latitude: "-38.287879", longitude: "144.476408", image: "https://i.ytimg.com/vi/VdKmXq5dFJs/maxresdefault.jpg", region_id: 2, tide_optimal_min_metres: "0.0", tide_optimal_max_metres: "0.0", swell_optimal_size_min_metres: "0.5", swell_optimal_size_max_metres: "1.8", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "30.0", wave_model_lat: "-38.608", wave_model_lon: "144.501", willyweather_location_id: 19298, weighting_swell: "0.4", weighting_wind: "0.4", weighting_tide: "0.2", wave_model_size_coefficient: "0.7", swell_optimal_direction_min: "200.0", swell_optimal_direction_max: "250.0", wind_optimal_direction_min: "290.0", wind_optimal_direction_max: "0.0"},
  {name: "Woolamai", description: "Exposed beach break on Phillip Island.", season: "All year", latitude: "-38.543488", longitude: "145.336881", image: "", region_id: 3, tide_optimal_min_metres: "0.0", tide_optimal_max_metres: "0.0", swell_optimal_size_min_metres: "0.5", swell_optimal_size_max_metres: "2.5", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "15.0", wave_model_lat: "-39.196", wave_model_lon: "145.096", willyweather_location_id: 11840, weighting_swell: "0.5", weighting_wind: "0.5", weighting_tide: "0.1", wave_model_size_coefficient: "0.8", swell_optimal_direction_min: "230.0", swell_optimal_direction_max: "260.0", wind_optimal_direction_min: "0.0", wind_optimal_direction_max: "60.0"},
  {name: "Torquay Point", description: "Right-hand, consistent point break. Popular longboarding spot but can get heavy on big days.", season: "Winter", latitude: "-38.34448", longitude: "144.319491", image: "", region_id: 2, tide_optimal_min_metres: "0.0", tide_optimal_max_metres: "0.0", swell_optimal_size_min_metres: "0.5", swell_optimal_size_max_metres: "3.5", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "30.0", wave_model_lat: "-38.608", wave_model_lon: "144.501", willyweather_location_id: 11642, weighting_swell: "0.5", weighting_wind: "0.5", weighting_tide: "0.0", wave_model_size_coefficient: "0.6", swell_optimal_direction_min: "210.0", swell_optimal_direction_max: "250.0", wind_optimal_direction_min: "290.0", wind_optimal_direction_max: "0.0"},
  {name: "Lorne Point", description: "Right-hand sandy point break that works best with big swells, popular longboarding spot otherwise.", season: "Winter", latitude: "-38.542989", longitude: "143.980516", image: "", region_id: 2, tide_optimal_min_metres: "0.2", tide_optimal_max_metres: "0.6", swell_optimal_size_min_metres: "1.5", swell_optimal_size_max_metres: "3.0", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "30.0", wave_model_lat: "-38.540586", wave_model_lon: "144.01446", willyweather_location_id: 11642, weighting_swell: "0.5", weighting_wind: "0.5", weighting_tide: "0.2", wave_model_size_coefficient: "0.5", swell_optimal_direction_min: "140.0", swell_optimal_direction_max: "200.0", wind_optimal_direction_min: "290.0", wind_optimal_direction_max: "0.0"},
  {name: "Gunnamatta", description: "A range of left and right beach breaks, very consistent and exposed.", season: "Summer", latitude: "-38.447245", longitude: "144.855312", image: "", region_id: 1, tide_optimal_min_metres: "0.0", tide_optimal_max_metres: "0.0", swell_optimal_size_min_metres: "0.2", swell_optimal_size_max_metres: "2.2", wind_optimal_strength_min_kmh: "0.0", wind_optimal_strength_max_kmh: "20.0", wave_model_lat: "-38.608", wave_model_lon: "144.501", willyweather_location_id: 19278, weighting_swell: "0.5", weighting_wind: "0.5", weighting_tide: "0.0", wave_model_size_coefficient: "0.8", swell_optimal_direction_min: "210.0", swell_optimal_direction_max: "260.0", wind_optimal_direction_min: "355.0", wind_optimal_direction_max: "80.0"}
])

# NOTE: to populate forecast data (ie S/W/T data) run a `rails forecasts:update`

Feature.create!(
  [
    { key: 'WAVE_DIRECTION', value: 'LEFT', friendly_name: 'Left hander', icon: 'chevron-left' },
    { key: 'WAVE_DIRECTION', value: 'RIGHT', friendly_name: 'Right hander', icon: 'chevron-right' },
    { key: 'WAVE_DIRECTION', value: 'LEFT_AND_RIGHT', friendly_name: 'Lefts and rights', icon: 'chevrons-up' },
    { key: 'BREAK_TYPE', value: 'POINT', friendly_name: 'Point break', icon: nil },
    { key: 'BREAK_TYPE', value: 'BEACH', friendly_name: 'Beachie', icon: nil },
    { key: 'BREAK_FLOOR', value: 'SAND', friendly_name: 'Sand bottom', icon: nil },
    { key: 'BREAK_FLOOR', value: 'REEF', friendly_name: 'Reef bottom', icon: nil },
    { key: 'SWELL_EXPOSURE', value: 'HIGH', friendly_name: 'Swell magnet', icon: 'target' },
    { key: 'SWELL_EXPOSURE', value: 'LOW', friendly_name: nil, icon: nil },
    { key: 'WIND_EXPOSURE', value: 'HIGH', friendly_name: nil, icon: nil },
    { key: 'WIND_EXPOSURE', value: 'LOW', friendly_name: 'Protected from prevailing winds', icon: 'shield' },
    { key: 'CROWDS', value: 'HIGH', friendly_name: 'Gets crowded', icon: 'users' },
    { key: 'CROWDS', value: 'LOW', friendly_name: 'Usually uncrowded', icon: nil },
    { key: 'IS_PARKING', value: nil, friendly_name: 'Carpark', icon: 'square' },
    { key: 'IS_TOILET', value: nil, friendly_name: 'Toilet', icon: nil },
    { key: 'IS_BEGINNER_FRIENDLY', value: nil, friendly_name: 'Beginner friendly', icon: 'heart' },
    { key: 'HANDLES_BIG_SWELL', value: nil, friendly_name: 'Handles big swells', icon: 'alert-triangle' },
    { key: 'IS_CAMPING', value: nil, friendly_name: 'Camping nearby', icon: 'compass' },
    { key: 'IS_LOCALISED', value: nil, friendly_name: 'Angry locals', icon: 'thumbs-down' }
  ]
)

SpotsFeature.create!([
  {feature_id: 3, spot_id: 1},
  {feature_id: 5, spot_id: 1},
  {feature_id: 6, spot_id: 1},
  {feature_id: 8, spot_id: 1},
  {feature_id: 13, spot_id: 1},
  {feature_id: 14, spot_id: 1},
  {feature_id: 15, spot_id: 1},
  {feature_id: 2, spot_id: 2},
  {feature_id: 4, spot_id: 2},
  {feature_id: 7, spot_id: 2},
  {feature_id: 8, spot_id: 2},
  {feature_id: 12, spot_id: 2},
  {feature_id: 14, spot_id: 2},
  {feature_id: 15, spot_id: 2},
  {feature_id: 2, spot_id: 3},
  {feature_id: 4, spot_id: 3},
  {feature_id: 7, spot_id: 3},
  {feature_id: 8, spot_id: 3},
  {feature_id: 12, spot_id: 3},
  {feature_id: 14, spot_id: 3},
  {feature_id: 15, spot_id: 3},
  {feature_id: 17, spot_id: 3},
  {feature_id: 19, spot_id: 3},
  {feature_id: 3, spot_id: 4},
  {feature_id: 5, spot_id: 4},
  {feature_id: 6, spot_id: 4},
  {feature_id: 8, spot_id: 4},
  {feature_id: 10, spot_id: 4},
  {feature_id: 13, spot_id: 4},
  {feature_id: 14, spot_id: 4},
  {feature_id: 3, spot_id: 5},
  {feature_id: 5, spot_id: 5},
  {feature_id: 6, spot_id: 5},
  {feature_id: 8, spot_id: 5},
  {feature_id: 10, spot_id: 5},
  {feature_id: 14, spot_id: 5},
  {feature_id: 15, spot_id: 5},
  {feature_id: 2, spot_id: 6},
  {feature_id: 6, spot_id: 6},
  {feature_id: 9, spot_id: 6},
  {feature_id: 11, spot_id: 6},
  {feature_id: 12, spot_id: 6},
  {feature_id: 14, spot_id: 6},
  {feature_id: 15, spot_id: 6},
  {feature_id: 16, spot_id: 6},
  {feature_id: 17, spot_id: 6},
  {feature_id: 2, spot_id: 7},
  {feature_id: 4, spot_id: 7},
  {feature_id: 6, spot_id: 7},
  {feature_id: 9, spot_id: 7},
  {feature_id: 11, spot_id: 7},
  {feature_id: 12, spot_id: 7},
  {feature_id: 14, spot_id: 7},
  {feature_id: 15, spot_id: 7},
  {feature_id: 16, spot_id: 7},
  {feature_id: 17, spot_id: 7},
  {feature_id: 18, spot_id: 7},
  {feature_id: 3, spot_id: 8},
  {feature_id: 5, spot_id: 8},
  {feature_id: 8, spot_id: 8},
  {feature_id: 10, spot_id: 8},
  {feature_id: 14, spot_id: 8},
  {feature_id: 15, spot_id: 8},
  {feature_id: 17, spot_id: 8}
])