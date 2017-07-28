class RefactorSpotOptimalDirections < ActiveRecord::Migration[5.1]
  def change
    remove_column :spots, :swell_optimal_direction, :decimal
    remove_column :spots, :swell_optimal_direction_max_variance, :decimal
    remove_column :spots, :wind_optimal_direction, :decimal
    remove_column :spots, :wind_optimal_direction_max_variance, :decimal
    add_column :spots, :swell_optimal_direction_min, :decimal
    add_column :spots, :swell_optimal_direction_max, :decimal
    add_column :spots, :wind_optimal_direction_min, :decimal
    add_column :spots, :wind_optimal_direction_max, :decimal
  end
end
