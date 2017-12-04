class UvIndex < ApplicationRecord
  belongs_to :spot

  validates :uv_index, :inclusion => { :in => [0, 20] }
end
