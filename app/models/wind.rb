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
  require 'willyweather_client'
  # default_scope { order(date_time: :desc) }
  belongs_to :spot

  class << self
    def fetch_forecasts(spot)
      spot.set_willyweather_location_id_if_needed # TODO - move into WW client too

      wind = WillyWeather::Wind.fetch(spot.willyweather_location_id)

      wind.forecasts.each do |day|
        day['entries'].each do |forecast|
          save_wind_forecast_entry(spot_id, forecast, wind.location['timeZone'])
        end
      end
    end

    private

    def save_wind_forecast_entry(spot_id, forecast, spot_timezone)
      Time.zone = spot_timezone # Willyweather provides datetimes in the timezone of the location, we need to parse it into UTC
      forecast_datetime = Time.zone.parse(forecast['dateTime'])
      Time.zone = Rails.application.config.time_zone # Reset back to config setting

      wind_record = Wind.where(
        date_time: forecast_datetime.utc,
        spot_id: spot_id
      ).first_or_initialize

      wind_record.speed = forecast['speed']
      wind_record.direction = forecast['direction']
      wind_record.direction_text = forecast['directionText']

      wind_record.save
    end
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
      wind.speed speed
      wind.direction direction
      wind.direction_text direction_text
      wind.date_time date_time
      wind.direction_rating direction_rating
      wind.speed_rating speed_rating
      wind.rating rating
    end
  end

  def poseidon_math
    @poseidon_math ||= PoseidonMath.new
  end
end
