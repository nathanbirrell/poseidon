class CreateUvIndices < ActiveRecord::Migration[5.1]
  def change
    create_table :uv_indices do |t|
      t.datetime :date_time, null: false
      t.integer :uv_index
      t.string :scale
      t.integer :spot_id, null: false

      t.timestamps
    end
    add_index :uv_indices, :spot_id
  end
end
