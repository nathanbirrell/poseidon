class AddAttributesToSpot < ActiveRecord::Migration[5.0]

  change_table :spots do |t|
    t.remove :optimal_wind_direction_degrees
    t.remove :optimal_swell_direction_degrees
    t.remove :optimal_tide_height_metres

    t.rename :optimal_tide_height_low_metres, :tide_optimal_min_metres
    t.rename :optimal_tide_height_high_metres, :tide_optimal_max_metres

    t.decimal :swell_optimal_size_min_metres
    t.decimal :swell_optimal_size_max_metres
    t.decimal :swell_optimal_period_seconds
    t.integer :swell_optimal_direction_min_degrees
    t.integer :swell_optimal_direction_max_degrees
    t.decimal :wind_optimal_strength_min_kmh
    t.decimal :wind_optimal_strength_max_kmh
    t.integer :wind_optimal_direction_min_degrees
    t.integer :wind_optimal_direction_max_degrees
  end
end
