require 'nokogiri'
require 'json'
require 'open-uri'
require 'rest-client'

=begin
USAGE:
this script returns the following variablies:
  wind_speed
  wind_direction
  swell_size
  swell_period
  swell_direction
  current_tide_height
=end

# api key for willy weather = MmY4MzNhYzdiNzI2ZDcxNmUwNzBlOT
# location id for cape schanck = 13813

=begin
WIND SCRIPT
=end

willy_weather_url = "https://api.willyweather.com.au/v2/MmY4MzNhYzdiNzI2ZDcxNmUwNzBlOT/locations/13813/weather.json?observational=true"
response = RestClient.get(willy_weather_url)
my_hash = JSON.parse(response)


wind_speed = my_hash["observational"]["observations"]["wind"]["speed"]
wind_direction = my_hash["observational"]["observations"]["wind"]["direction"]

=begin
SWELL SCRIPT
=end

magic_seaweed_url = "http://magicseaweed.com/Flinders-Beach-Surf-Report/1055/"
response_two = Nokogiri::HTML(open(magic_seaweed_url))

# convert html to text for regex compatibility
response_to_string = response_two.to_s
meters_conversion = 0.3048

# narrow down regex search string
identify_attributes = response_to_string.scan(/<div class="list-group-content">  <div class="inline-block"> <strong>\d*\.?\d*<\/strong><small>ft<\/small> <small>at<\/small> <strong>\d*<\/strong><small>s<\/small> <\/div> <span class="svg-icon-container msw-js-tooltip" title="\w+ - \d*\.?\d*°">/)


# capture swell size
identify_primary_swell = identify_attributes[0].scan(/\d+\.*\d*/)
primary_swell_before_converstion = identify_primary_swell[0].to_f
swell_size = primary_swell_before_converstion*meters_conversion


# capture swell period
identify_period = identify_attributes[0].scan(/<small>at<\/small> <strong>\d*<\/strong>/)
swell_period = identify_period[0].scan(/[0-9]\.*[0-9]*/)


# capture swell direction
identify_swell_direction = identify_attributes[0].scan(/title="\w+ - \d*\.?\d*/)
swell_direction = identify_swell_direction[0].scan(/\d*\.\d*/)

=begin
TIDE SCRIPT
=end

willy_weather_tides_url = "https://api.willyweather.com.au/v2/MmY4MzNhYzdiNzI2ZDcxNmUwNzBlOT/locations/13813/weather.json?forecasts=tides&days=2"
response_three = RestClient.get(willy_weather_tides_url)
my_hash = JSON.parse(response_three)


day_1 = my_hash["forecasts"]["tides"]["days"][0]
day_2 = my_hash["forecasts"]["tides"]["days"][1]


day_1_tide_forecast = my_hash["forecasts"]["tides"]["days"][0]["entries"]
day_2_tide_forecast = my_hash["forecasts"]["tides"]["days"][1]["entries"]
puts "DAY_1_TIDE_FORECAST WAS CREATED..."
puts "DAY_2_TIDE_FORECAST WAS CREATED..."


# initialise counter & time - time format time.strftime("%H:%M")
counter = 0
time = Time.new()


# we want to set the counter to the correct tide index
for x in day_1_tide_forecast
  # first we want to compare the value 'hour' against the current time
  if time.strftime("%H").to_i > x["dateTime"][-8..-7].to_i
    counter += 1
  end
  # now we want to check if the value 'minute' against the current time
  if time.strftime("%H").to_i == x["dateTime"][-8..-7].to_i
    if time.strftime("%M").to_i > x["dateTime"][-5..-4].to_i
      counter +=1
    end
  end
end
puts "THE COUNTER HAS BEEN SET TO " + counter.to_s + "..."


# we assign "height_one" as the tide just past, and "height_two" as the tide coming
# we use these two values to determine:
# - the difference in height between the two tides (absolute value)
# - how much time has past since the last tide
# make checks to ensure counter does not exceed the range of array
# if last tide of the day
if counter == day_1_tide_forecast.length
  # height_one is assigned to last tide of today
  # height_two is assigned to first tide of tomorrow
  height_one = day_1_tide_forecast[counter-1]["height"]
  height_two = day_2_tide_forecast[0]["height"]
end


# if first tide of the day
if counter == 0
  #yesturdays_tide_forecast = CurrentConditions.last(which ever table reference)
  height_one = 1.0
  height_two = day_1_tide_forecast[0]["height"]
end

# actual assignment of height values
height_one = day_1_tide_forecast[counter-1]["height"]
height_two = day_1_tide_forecast[counter]["height"]
height_difference = (height_one.to_f - height_two.to_f).abs
puts "HEIGHT_ONE HAS BEEN SET TO " + height_one.to_s + "..."
puts "HEIGHT_TWO HAS BEEN SET TO " + height_two.to_s + "..."
puts "HEIGHT_DIFFERENCE HAS BEEN SET TO " + height_difference.to_s + "..."


# we need to set the negative multiplier to correspond with rising or falling tide
# this will determine if we need to subtract or add to the current tide height, to find the current tide height
negative_multiplier = 1
if height_one > height_two
  negative_multiplier = -1
end
puts "NEGATIVE_MULTIPLIER HAS BEEN SET TO " + negative_multiplier.to_s + "..."


# we need to determine how many hours/minutes have past since the last tide
current_hour = time.strftime("%H").to_i
current_minute = time.strftime("%M").to_i
comparison_hour = day_1_tide_forecast[counter-1]["dateTime"][-8..-7].to_i
comparison_minute = day_1_tide_forecast[counter-1]["dateTime"][-5..-4].to_i
hours_past = current_hour - comparison_hour
minutes_past = current_minute - comparison_minute
minutes_decimal = minutes_past.to_f/60.to_f


# tide_fraction is a float representation of the "1:2:3:3:2:1" rule
# hours_past will determine which element from tide_fraction to use
# minutes_decimal will determine how much of tide_fraction_plus to add tide_fraction
tide_fraction = [1.0/12.0, 3.0/12.0, 6.0/12.0, 9.0/12.0, 11.0/12.0, 12.0/12.0]
tide_fraction_plus = [1.0/12.0, 2.0/12.0, 3.0/12.0, 3.0/12.0, 2.0/12.0, 1.0/12.0]


# we need to check if we are within the first hour of a new tide
# we need to check if we are in the last our of a tide
# if we are within the first hour, we do not need the tide_fraction
if (hours_past-1) > 0
  height_multiplyer = ((tide_fraction[hours_past-1].to_f)+(minutes_decimal*tide_fraction_plus[hours_past].to_f))*negative_multiplier.to_f
else
  height_multiplyer = (minutes_decimal*tide_fraction_plus[hours_past].to_f)*negative_multiplier.to_f
end
puts "HEIGHT_MULTIPLIER HAS BEEN SET TO " + height_multiplyer.to_s + "..."


height_to_add = (height_multiplyer.to_f*height_difference.to_f)
current_tide_height = (height_one.to_f + height_to_add.to_f).round(1)
puts "HEIGHT_TO_ADD HAS BEEN SET TO " + height_to_add.to_s + "..."
puts "THE CURRENT TIDE HEIGHT IS " + current_tide_height.to_s + "m"


