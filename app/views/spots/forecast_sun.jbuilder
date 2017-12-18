rows = []

@forecast_sun.each do |row|
  rows << row.to_builder.attributes!
end

json.array! rows