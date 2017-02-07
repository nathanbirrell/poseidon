class UpdateSpotDetails < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :optimal_wind_direction_degrees, :integer
    add_column :spots, :optimal_swell_direction_degrees, :integer

    remove_column :spots, :optimal_wind_direction
    remove_column :spots, :optimal_swell_direction
  end
end
