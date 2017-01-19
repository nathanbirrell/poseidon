class CreateSpots < ActiveRecord::Migration[5.0]
  def change
    create_table :spots do |t|
      t.string :name
      t.string :description
      t.string :optimal_wind_direction
      t.string :optimal_swell_direction
      t.string :season

      t.timestamps
    end
  end
end
