class CreateObservations < ActiveRecord::Migration[5.0]
  def change
    create_table :observations do |t|
      t.decimal :swell_size_metres
      t.decimal :swell_period_seconds
      t.integer :swell_direction_degrees
      t.decimal :wind_strength_kmh
      t.integer :wind_direction_degrees
      t.string :tide_height_metres
      t.references :spot, foreign_key: true

      t.timestamps
    end
  end
end
