class ChangeTideColumnNames < ActiveRecord::Migration[5.0]
  def change
    rename_column :tides, :tide_type, :type
    rename_column :tides, :tide_height_above_sea_level_metres, :height
    rename_column :tides, :tide_date_time, :date_time
  end
end
