class CreateWinds < ActiveRecord::Migration[5.0]
  def change
    create_table :winds do |t|
      t.decimal :speed
      t.integer :direction
      t.string :direction_text
      t.datetime :date_time
      t.integer :spot_id

      t.timestamps
    end
    add_index :winds, :spot_id
  end
end
