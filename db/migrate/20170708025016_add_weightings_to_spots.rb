class AddWeightingsToSpots < ActiveRecord::Migration[5.1]
  def change
    add_column :spots, :weighting_swell, :decimal, :precision => 1, :scale => 2
    add_column :spots, :weighting_wind, :decimal, :precision => 1, :scale => 2
    add_column :spots, :weighting_tide, :decimal, :precision => 1, :scale => 2
  end
end
