json.extract! spot,
    :name,
    :description,
    :season,
    :created_at,
    :updated_at,
    :latitude,
    :longitude,
    :image,
    :region_id,
    :tide_optimal_min_metres,
    :tide_optimal_max_metres,
    :swell_optimal_size_min_metres,
    :swell_optimal_size_max_metres,
    :swell_optimal_direction_min,
    :swell_optimal_direction_max,
    :wind_optimal_strength_min_kmh,
    :wind_optimal_strength_max_kmh,
    :wind_optimal_direction_min,
    :wind_optimal_direction_max,
    :wave_model_lat,
    :wave_model_lon,
    :willyweather_location_id,
    :weighting_swell,
    :weighting_wind,
    :weighting_tide,
    :wave_model_size_coefficient
json.url spot_url(spot, format: :json)
