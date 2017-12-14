class Feature < ApplicationRecord
  has_many :spots_features
  has_many :spots, :through => :spots_features
end
