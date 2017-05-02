class AddWaveModelCoordsToSpots < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :wave_model_lat, :decimal
    add_column :spots, :wave_model_lon, :decimal
  end
end
