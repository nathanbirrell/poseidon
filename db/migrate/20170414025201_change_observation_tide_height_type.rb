class ChangeObservationTideHeightType < ActiveRecord::Migration[5.0]
  def change
    remove_column :observations, :tide_height_metres
    add_column :observations, :tide_height_metres, :decimal
  end
end
