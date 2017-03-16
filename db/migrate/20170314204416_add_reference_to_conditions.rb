class AddReferenceToConditions < ActiveRecord::Migration[5.0]
  change_table :current_conditions do |t|
    t.remove :spot_id
    t.references :spot
  end
end
