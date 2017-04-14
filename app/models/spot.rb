class Spot < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :region

  has_many :observations

  validates :name, presence: true

  # get latest latest_observation data
  def latest_observation
    Observation.where(spot_id: id).first
  end

  # caclulate a tide rating
  def tide_rating
    return 0 unless latest_observation

    rating = 0

    tide_within_optimal_params = (latest_observation.tide_height_metres > tide_optimal_min_metres) || (latest_observation.tide_height_metres < tide_optimal_max_metres)

    rating = 1 if tide_within_optimal_params

    rating
  end

  def current_potential
    # calculate aggregate potential rating based on tide/wind/swell

    aggregate = tide_rating / 3.0

    # calculate a wind rating
    # calculate a swell rating
    # calculate an aggregate rating (as %)

    aggregate * 100.0
  end

  private

  # private methods here
end
