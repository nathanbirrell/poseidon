class CreateTides < ActiveRecord::Migration[5.0]
  def change
    create_table :tides do |t|
      t.string :tide_type
      t.decimal :tide_height_above_sea_level_metres
      t.string :tide_date_time
      t.references :spot, foreign_key: true

      t.timestamps
    end
  end
end
