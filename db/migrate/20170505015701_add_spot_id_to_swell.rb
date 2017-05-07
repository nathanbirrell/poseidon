class AddSpotIdToSwell < ActiveRecord::Migration[5.0]
  def change
    add_column :swells, :spot_id, :integer
    add_index :swells, :spot_id
  end
end
