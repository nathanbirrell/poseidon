class AddHiddenToSpots < ActiveRecord::Migration[5.1]
  def up
    add_column :spots, :hidden, :boolean
    Spot.update_all(hidden: false)
  end

  def down
    remove_column :spots, :hidden
  end
end
