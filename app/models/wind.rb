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

class Wind < WeatherForecast
  include WillyweatherClient
  include SpotsHelper
  default_scope { order(date_time: :asc) }
  belongs_to :spot

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::WindForecasts.fetch(spot)
    forecasts.save_entries
  end

  def direction_rating
    return 0 unless direction
    data = poseidon_math.normalise_degrees(
      min_x: spot.wind_optimal_direction_min,
      max_x: spot.wind_optimal_direction_max,
      x_value: direction
    )
    poseidon_math.rating_given_x(data)
  end

  # TODO: move me out of this model! tsk tsk
  def direction_description
    return '' unless direction
    dir_rating = direction_rating()
    return 'Offshore' if dir_rating >= 75
    return 'Cross-shore' if dir_rating >= 50
    return 'Onshore' if dir_rating < 50
  end

  def speed_rating
    return 0 unless speed
    poseidon_math.rating_given_x(
      min_x: spot.wind_optimal_strength_min_kmh,
      max_x: spot.wind_optimal_strength_max_kmh,
      x_value: speed
    )
  end

  def rating
    weight_of_optimal_wind_direction = 0.8
    weight_of_optimal_wind_speed = 0.2
    rating = (direction_rating * weight_of_optimal_wind_direction) + (speed_rating * weight_of_optimal_wind_speed)
    rating.round(2)
  end

  def to_builder
    Jbuilder.new do |wind|
      wind.id id
      wind.date_time date_time
      wind.speed speed
      wind.direction direction
      wind.direction_text direction_text
      wind.direction_description direction_description
      wind.direction_rating direction_rating
      wind.speed_rating speed_rating
      wind.rating rating
    end
  end

  def poseidon_math
    @poseidon_math ||= PoseidonMath.new
  end
end
