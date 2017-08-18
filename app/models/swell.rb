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
  include Math
  require 'poseidon_math'
  belongs_to :spot

  class << self
    # TODO: Retrieve swell data via Willyweather as well for consistency?
    #   Willyweather also uses NOAA. OR fetch from ECWMF.
    def fetch_forecasts(spot)
      # example response: https://goo.gl/yyL27S
      response = get_noaa_forecast(spot)
      entries = response['entries']

      entries.each do |entry|
        save_swell_forecast_entry(spot.id, entry)
      end
    end

    private

    def get_noaa_forecast(spot)
      response = RestClient.get(
        'https://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point',
        {
          params: {
            'apikey' => ENV['PLANETOS_API_KEY'],
            'lat' => spot.wave_model_lat,
            'lon' => spot.wave_model_lon,
            'count' => '25',
            'context' => 'reftime_time_lat_lon'
          }
        }
      )

      response = JSON.parse(response)
      response
    end

    def save_swell_forecast_entry(spot_id, entry)
      datetime = DateTime.parse(entry["axes"]["time"]) # DateTime provided in UTC :)

      swell_entry = Swell.where(
        date_time: datetime,
        spot_id: spot_id
      ).first_or_initialize

      swell_entry.size = entry["data"]["Significant_height_of_combined_wind_waves_and_swell_surface"]
      swell_entry.period = entry["data"]["Primary_wave_mean_period_surface"]
      swell_entry.direction = entry["data"]["Primary_wave_direction_surface"]
      # TODO: we should probably store these fields, need to create the cols first though
      # swell_entry.axes_reftime = DateTime.parse(entry["axes"]["reftime"])
      # swell_entry.axes_lat = entry["axes"]["latitude"]
      # swell_entry.axes_lon = entry["axes"]["longitude"]
      swell_entry.save
    end
  end

  def size
    # Swell size is *always* the model size by the coefficient, thus calibrating
    #   the spot to it's nearest model reading.
    self[:size] * spot.wave_model_size_coefficient
  end

  def dir_rating
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
    rating += (dir_rating * weight_of_optimal_swell_direction)
    rating += (period_rating * weight_of_swell_period)
    rating.round(2)
  end

  def swell_in_3_hours
    @swell_in_3_hours ||= Swell.in_three_hours(spot_id)
  end

  def poseidon_math
    @poseidon_math ||= PoseidonMath.new
  end
end
