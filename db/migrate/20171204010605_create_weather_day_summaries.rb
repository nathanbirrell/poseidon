class CreateWeatherDaySummaries < ActiveRecord::Migration[5.1]
  def change
    create_table :weather_day_summaries do |t|
      t.datetime :date_time, null: false
      t.integer :temp_min
      t.integer :temp_max
      t.string :precis_code
      t.string :precis
      t.string :precis_overlay_code
      t.integer :spot_id, null: false

      t.timestamps
    end
    add_index :weather_day_summaries, :spot_id
  end
end
