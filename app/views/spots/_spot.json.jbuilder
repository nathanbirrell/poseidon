json.extract! spot, :id, :name, :description, :wind_optimal_direction_min_degrees, :swell_optimal_direction_min_degrees, :season, :created_at, :updated_at, :image, :latitude, :longitude, :region_id
json.url spot_url(spot, format: :json)
