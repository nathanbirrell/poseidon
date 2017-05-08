class RenameTideColumnTypeToTideType < ActiveRecord::Migration[5.0]
  def change
    rename_column :tides, :type, :tide_type
  end
end
