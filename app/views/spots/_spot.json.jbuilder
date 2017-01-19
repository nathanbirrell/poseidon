json.extract! spot, :id, :name, :description, :optimal_wind_direction, :optimal_swell_direction, :season, :created_at, :updated_at, :image, :latitude, :longitude, :region_id
json.url spot_url(spot, format: :json)
