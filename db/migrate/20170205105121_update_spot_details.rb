class UpdateSpotDetails < ActiveRecord::Migration[5.0]
  def change
    change_column :spots, :optimal_wind_direction, :integer
    change_column :spots, :optimal_swell_direction, :integer

    rename_column :spots, :optimal_wind_direction, :optimal_wind_direction_degrees
    rename_column :spots, :optimal_swell_direction, :optimal_swell_direction_degrees
  end
end
