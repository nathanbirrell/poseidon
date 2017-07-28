class AddWaveModelSizeCoefficientToSpots < ActiveRecord::Migration[5.1]
  def change
    add_column :spots, :wave_model_size_coefficient, :decimal, precision: 4, scale: 3

    Spot.find_each do |spot|
      spot.wave_model_size_coefficient = 1.0 unless spot.wave_model_size_coefficient
      spot.save!
    end
  end
end
