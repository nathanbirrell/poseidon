class ChangeTideDateTimeType < ActiveRecord::Migration[5.0]
  def change
    remove_column :tides, :date_time
    add_column :tides, :date_time, :datetime
  end
end
