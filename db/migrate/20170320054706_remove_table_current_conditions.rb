class RemoveTableCurrentConditions < ActiveRecord::Migration[5.0]
  def change
    drop_table :current_conditions
  end
end
