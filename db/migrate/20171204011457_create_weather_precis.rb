class CreateWeatherPrecis < ActiveRecord::Migration[5.1]
  def change
    create_table :weather_precis do |t|
      t.datetime :date_time
      t.string :precis_code
      t.string :precis
      t.string :precis_overlay_code
      t.boolean :night
      t.integer :spot_id

      t.timestamps
    end
    add_index :weather_precis, :spot_id
  end
end
