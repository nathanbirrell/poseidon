class Spot < ApplicationRecord
  include ActiveModel::Validations

  links_to :region

  validates :name, presence: true
end
