class Spot < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :region

  validates :name, presence: true
end
