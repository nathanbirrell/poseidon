# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = CreateAdminService.new.call
puts 'CREATED ADMIN USER: ' << user.email

region = Region.create(
    name: 'Mornington Peninsula',
    description: 'East of Melbourne.',
    country: 'Australia',
    state: 'Victoria'
  )

Spot.create(
  name: 'Cape Schanck',
  description: 'Long left-hand point',
  optimal_wind_direction_degrees: '0',
  optimal_swell_direction_degrees: 200,
  optimal_tide_height_metres: 1.2,
  optimal_tide_height_low_metres: 1,
  optimal_tide_height_high_metres: 1.5,
  season: 'March',
  image: 'http://www.surfcoast.vic.gov.au/files/assets/public/tourism/images/bellsbeachlandscape.jpg',
  latitude: -38.3699279,
  longitude: 144.2779936,
  region_id: region.id
)
