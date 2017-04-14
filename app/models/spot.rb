class Spot < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :region

  has_many :observations

  validates :name, presence: true

  def current_potential
    # get latest observation data
    # caclulate a tide rating
    # calculate a wind rating
    # calculate a swell rating
    # calculate an aggregate rating (as %)
    0
  end
end
