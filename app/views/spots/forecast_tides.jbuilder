rows = []

@forecast_tides.each do |row|
  rows << row.to_builder.attributes!
end

json.array! rows