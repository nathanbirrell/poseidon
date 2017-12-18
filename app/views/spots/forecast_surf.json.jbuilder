overall_ratings = []
swells = []
winds = []
tides = []

@forecast_surf[:overall_ratings].each do |rating|
  overall_ratings << rating
end

@forecast_surf[:swells].each do |swell|
  swells << swell.to_builder.attributes!
end

@forecast_surf[:winds].each do |wind|
  winds << wind.to_builder.attributes!
end

@forecast_surf[:tides].each do |tide|
  tides << tide.to_builder.attributes!
end

json.overall_ratings overall_ratings
json.swells swells
json.winds winds
json.tides tides