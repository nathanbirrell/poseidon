swells = []
winds = []
tides = []

@forecasts[:swells].each do |swell|
  swells << swell.to_builder.attributes!
end

@forecasts[:winds].each do |wind|
  winds << wind.to_builder.attributes!
end

@forecasts[:tides].each do |tide|
  tides << tide.to_builder.attributes!
end

json.swells swells
json.winds winds
json.tides tides