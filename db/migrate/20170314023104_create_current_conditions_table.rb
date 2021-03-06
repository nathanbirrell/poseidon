class CreateCurrentConditionsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :current_conditions do |t|
      t.integer :spot_id

      t.decimal :swell_size_metres
      t.decimal :swell_period_metres
      t.integer :swell_direction_degrees
      t.decimal :wind_strength_kmh
      t.integer :wind_direction_degrees
      t.decimal :tide_height_metres
    end
  end
end
