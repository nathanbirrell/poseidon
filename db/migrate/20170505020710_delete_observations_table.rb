class DeleteObservationsTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :observations
  end
end
