# Join table (for many-to-many)
class SpotsFeature < ApplicationRecord
  belongs_to :spot
  belongs_to :feature
end