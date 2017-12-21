rows = []

@forecast_weather_daily.each do |row|
  rows << row.to_builder.attributes!
end

json.array! rows