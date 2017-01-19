class AddCoordinatesToSpot < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :lat, :decimal, {:precision=>10, :scale=>6}
    add_column :spots, :lng, :decimal, {:precision=>10, :scale=>6}
  end
end
