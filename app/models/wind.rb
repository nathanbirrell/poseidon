# == Schema Information
#
# Table name: winds
#
#  id             :integer          not null, primary key
#  speed          :decimal(, )
#  direction      :integer
#  direction_text :string
#  date_time      :datetime
#  spot_id        :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Wind < WeatherModel
  # default_scope { order(date_time: :desc) }
  belongs_to :spot

  def rating
    return 0 unless speed && direction

    weight_of_optimal_wind_speed = 0.2
    weight_of_optimal_wind_direction = 0.8

    rating = 0.0

    is_optimal_wind_speed = is_between(speed, spot.wind_optimal_strength_min_kmh, spot.wind_optimal_strength_max_kmh)
    rating += weight_of_optimal_wind_speed if is_optimal_wind_speed

    is_optimal_wind_direction = is_angle_inside_range(direction, spot.wind_optimal_direction_min_degrees, spot.wind_optimal_direction_max_degrees)
    rating += weight_of_optimal_wind_direction if is_optimal_wind_direction

    x = spot.wind_optimal_direction_min_degrees
    y = direction

    # TODO: clean me (remove logs)

    puts("Calculating angle between x=#{x} and y=#{y} = #{calculate_angle_between(x, y)}")

    puts("is_angle_inside_range target=#{direction} + min=#{spot.wind_optimal_direction_min_degrees} + max=#{spot.wind_optimal_direction_max_degrees} ?")
    puts("is_optimal_wind_direction= #{is_optimal_wind_direction}")

    puts("wind_rating: #{rating.to_s}")
    rating
  end
end
