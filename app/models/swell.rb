# == Schema Information
#
# Table name: swells
#
#  id         :integer          not null, primary key
#  size       :decimal(, )
#  period     :decimal(, )
#  direction  :integer
#  date_time  :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  spot_id    :integer
#

class Swell < WeatherForecast
  belongs_to :spot

  def rating
    return 0 unless size && direction && period

    weight_of_optimal_swell_height = 0.7
    weight_of_optimal_swell_direction = 0.3

    rating = 0.0

    is_optimal_swell_height = is_between(size, spot.swell_optimal_size_min_metres, spot.swell_optimal_size_max_metres)
    rating += weight_of_optimal_swell_height if is_optimal_swell_height

    is_optimal_swell_direction = is_angle_inside_range(direction, spot.swell_optimal_direction_min_degrees, spot.swell_optimal_direction_max_degrees)
    rating += weight_of_optimal_swell_direction if is_optimal_swell_direction

    puts("swell_rating: #{rating.to_s}")
    rating
  end
end
