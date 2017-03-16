class RemoveOptimalTideMetresFromSpots < ActiveRecord::Migration[5.0]
  def change
    change_column :spots, :optimal_tide_height_metres, :decimal
  end
end
