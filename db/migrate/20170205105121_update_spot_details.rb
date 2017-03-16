class UpdateSpotDetails < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :wind_optimal_direction_min_degrees, :integer
    add_column :spots, :swell_optimal_direction_min_degrees, :integer

    remove_column :spots, :optimal_wind_direction
    remove_column :spots, :optimal_swell_direction
  end
end
