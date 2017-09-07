overall_ratings = []
swells = []
winds = []
tides = []

@forecasts[:overall_ratings].each do |rating|
  overall_ratings << rating
end

@forecasts[:swells].each do |swell|
  swells << swell.to_builder.attributes!
end

@forecasts[:winds].each do |wind|
  winds << wind.to_builder.attributes!
end

@forecasts[:tides].each do |tide|
  tides << tide.to_builder.attributes!
end

json.overall_ratings overall_ratings
json.swells swells
json.winds winds
json.tides tides