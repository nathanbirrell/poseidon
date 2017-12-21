rows = []

@forecast_uv_index.each do |row|
  rows << row.to_builder.attributes!
end

json.array! rows