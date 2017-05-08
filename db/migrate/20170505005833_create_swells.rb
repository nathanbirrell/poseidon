class CreateSwells < ActiveRecord::Migration[5.0]
  def change
    create_table :swells do |t|
      t.decimal :size
      t.decimal :period
      t.integer :direction
      t.datetime :date_time

      t.timestamps
    end
  end
end
