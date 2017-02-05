class AddOptimalTideDetailsToSpot < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :optimal_tide_height_low_metres, :decimal
    add_column :spots, :optimal_tide_height_high_metres, :decimal
  end
end
