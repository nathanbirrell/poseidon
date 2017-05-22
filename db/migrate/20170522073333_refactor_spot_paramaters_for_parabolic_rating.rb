class RefactorSpotParamatersForParabolicRating < ActiveRecord::Migration[5.0]
  def change
    remove_column :spots, :swell_optimal_direction_min_degrees
    remove_column :spots, :swell_optimal_direction_max_degrees
    remove_column :spots, :wind_optimal_direction_min_degrees
    remove_column :spots, :wind_optimal_direction_max_degrees

    add_column :spots, :swell_optimal_direction, :decimal
    add_column :spots, :swell_optimal_direction_max_variance, :decimal
    add_column :spots, :wind_optimal_direction, :decimal
    add_column :spots, :wind_optimal_direction_max_variance, :decimal
  end
end
