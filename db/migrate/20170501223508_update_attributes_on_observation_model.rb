class UpdateAttributesOnObservationModel < ActiveRecord::Migration[5.0]
  def change
    change_table :observations do |t|
      t.datetime :axes_reftime
      t.datetime :axes_time
      t.decimal :axes_lat
      t.decimal :axes_lon
    end
  end
end
