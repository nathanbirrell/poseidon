class Spot < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :region

  validates :name, presence: true

  def forecasted_tide
    0.5
  end

  def tide_rating
    rating = 0

    if forecasted_tide.between?(optimal_tide_height_low_metres, optimal_tide_height_high_metres)
      rating = 10;
    else
      rating = 1;
    end

    rating
  end
end
