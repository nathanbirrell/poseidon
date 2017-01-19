class AddImageToSpot < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :image, :string
  end
end
