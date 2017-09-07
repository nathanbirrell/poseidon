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
    # methods:
    :optimals,
    :next_high_tide,
    :next_low_tide,
    # :tide_shift_rate,
    :current_tide_snapshot,
    :region,
    :works_on_all_tides?,
    :current_tide_snapshot.rating,
    :current_potential
)

json.url spot_url(spot, format: :json)

json.current_swell spot.current_swell.to_builder
json.current_wind spot.current_wind.to_builder