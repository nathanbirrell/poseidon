class Spot < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :region

  validates :name, presence: true

  def forecasted_tide
    0.5
  end

  def tide_rating
    rating = 0

    if forecasted_tide.between?(tide_optimal_min_metres, tide_optimal_max_metres)
      rating = 10;
    else
      rating = 1;
    end

    rating
  end
end
