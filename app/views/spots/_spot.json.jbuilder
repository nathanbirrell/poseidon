json.(
    spot,
    :id,
    :name,
    :description,
    :season,
    :latitude,
    :longitude,
    :image,
    :region_id,
    :wave_model_lat,
    :wave_model_lon,
    :weighting_swell,
    :weighting_wind,
    :weighting_tide,
    :wave_model_size_coefficient,
    # methods:
    :optimals,
    :last_tide,
    :next_tide,
    :low_tide,
    :high_tide,
    :tidal_range,
    :next_tide_subtext,
    :tide_period,
    :time_till_next_tide_hours,
    :tide_shift_rate,
    :current_tide_height,
    :rate_of_change_tide,
    :tide_remaining_or_to,
    :tide_hours_remaining,
    :region,
    :works_on_all_tides?,
    :current_tide_rating,
    :current_potential
)

json.url spot_url(spot, format: :json)

json.current_swell spot.current_swell.to_builder
json.current_wind spot.current_wind.to_builder