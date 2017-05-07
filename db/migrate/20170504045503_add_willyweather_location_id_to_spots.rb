class AddWillyweatherLocationIdToSpots < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :willyweather_location_id, :integer
  end
end
