class RemoveOptimalPeriodFromSpots < ActiveRecord::Migration[5.1]
  def change
    remove_column :spots, :swell_optimal_period_seconds, :decimal
  end
end
