class AddOptimalTideToSpot < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :optimal_tide_height_metres, :decimal
  end
end
