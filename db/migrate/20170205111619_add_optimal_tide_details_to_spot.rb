class AddOptimalTideDetailsToSpot < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :tide_optimal_min_metres, :decimal
    add_column :spots, :tide_optimal_max_metres, :decimal
  end
end
