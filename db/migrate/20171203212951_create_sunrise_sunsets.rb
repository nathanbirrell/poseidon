class CreateSunriseSunsets < ActiveRecord::Migration[5.1]
  def change
    create_table :sunrise_sunsets do |t|
      t.datetime :date_time
      t.integer :spot_id
      t.datetime :first_light
      t.datetime :sunrise
      t.datetime :sunset
      t.datetime :last_light

      t.timestamps
    end

    add_index :sunrise_sunsets, :spot_id
  end
end
