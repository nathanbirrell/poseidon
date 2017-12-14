# TODO: Use a spot to_builder method to get these attrs

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
    :next_tide,
    :next_high_tide,
    :next_low_tide,
    :region,
    :works_on_all_tides?,
    :current_model_date_time, # TODO: Rename to updated_at
    :current_potential
)

json.url spot_url(spot, format: :json)

json.current_swell spot.current_swell.to_builder
json.current_wind spot.current_wind.to_builder
json.current_tide_snapshot spot.current_tide_snapshot.to_builder

json.features spot.features.collect { |feature| feature.to_builder.attributes! }