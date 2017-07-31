class AddWeightingsToSpots < ActiveRecord::Migration[5.1]
  def change
    add_column :spots, :weighting_swell, :decimal, :precision => 3, :scale => 2
    add_column :spots, :weighting_wind, :decimal, :precision => 3, :scale => 2
    add_column :spots, :weighting_tide, :decimal, :precision => 3, :scale => 2

    Spot.find_each do |spot|
      spot.weighting_swell = 0.4
      spot.weighting_wind = 0.4
      spot.weighting_tide = 0.2
      spot.save!
    end
  end
end
