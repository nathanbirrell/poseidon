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
  default_scope { order(date_time: :asc) }
  belongs_to :spot

  def self.update_forecasts(spot)
    forecasts = NOAAClient.new(spot)
    forecasts.fetch
    forecasts.save
  end

  def size
    # Swell size is *always* the model size by the coefficient, thus calibrating
    #   the spot to it's nearest model reading.
    self[:size] * spot.wave_model_size_coefficient
  end

  def direction_rating
    return 0 unless direction
    data = poseidon_math.normalise_degrees(
      min_x: spot.swell_optimal_direction_min,
      max_x: spot.swell_optimal_direction_max,
      x_value: direction
    )
    poseidon_math.rating_given_x(data)
  end

  def size_rating
    return 0 unless size
    poseidon_math.rating_given_x(
      min_x: spot.swell_optimal_size_min_metres,
      max_x: spot.swell_optimal_size_max_metres,
      x_value: size
    )
  end

  def period_rating
    return 0 unless period
    # formula y = ax^b
    a = 1.4
    b = 1.7
    period_rating = a * period**b
    period_rating = 100.0 if period_rating > 100
    period_rating = 0.0 if period_rating.negative?
    period_rating
  end

  def rating
    weight_of_optimal_swell_height = 60 / 100
    weight_of_optimal_swell_direction = 30 / 100
    weight_of_swell_period = 10 / 100
    rating = (size_rating * weight_of_optimal_swell_height)
    rating += (direction_rating * weight_of_optimal_swell_direction)
    rating += (period_rating * weight_of_swell_period)
    rating.round(2)
  end

  def to_builder
    Jbuilder.new do |swell|
      swell.id id
      swell.size size
      swell.period period
      swell.direction direction
      swell.date_time date_time
      swell.rating rating
      swell.direction_rating direction_rating
      swell.size_rating size_rating
      swell.period_rating period_rating
    end
  end

  def poseidon_math
    @poseidon_math ||= PoseidonMath.new
  end
end
