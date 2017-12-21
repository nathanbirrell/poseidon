rows = []

@forecast_weather_precis.each do |row|
  rows << row.to_builder.attributes!
end

json.array! rows