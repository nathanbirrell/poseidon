class AddRegionToSpots < ActiveRecord::Migration[5.0]
  def change
    add_reference :spots, :region, foreign_key: true
  end
end
