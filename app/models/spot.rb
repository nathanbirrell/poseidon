# == Schema Information
#
# Table name: spots
#
#  id                            :integer          not null, primary key
#  name                          :string
#  description                   :string
#  season                        :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  latitude                      :decimal(10, 6)
#  longitude                     :decimal(10, 6)
#  image                         :string
#  region_id                     :integer
#  tide_optimal_min_metres       :decimal(, )
#  tide_optimal_max_metres       :decimal(, )
#  swell_optimal_size_min_metres :decimal(, )
#  swell_optimal_size_max_metres :decimal(, )
#  wind_optimal_strength_min_kmh :decimal(, )
#  wind_optimal_strength_max_kmh :decimal(, )
#  wave_model_lat                :decimal(, )
#  wave_model_lon                :decimal(, )
#  willyweather_location_id      :integer
#  weighting_swell               :decimal(1, 2)
#  weighting_wind                :decimal(1, 2)
#  weighting_tide                :decimal(1, 2)
#  wave_model_size_coefficient   :decimal(1, 3)
#  swell_optimal_direction_min   :decimal(, )
#  swell_optimal_direction_max   :decimal(, )
#  wind_optimal_direction_min    :decimal(, )
#  wind_optimal_direction_max    :decimal(, )
#

class Spot < ApplicationRecord
  include ActiveModel::Validations
  include Math
  require 'poseidon_math'

  belongs_to :region

  has_many :tides
  has_many :winds
  has_many :swells

  validates :name, presence: true

  class << self
    def update_forecasts
      Spot.all.each do |spot|
        Swell.update_forecasts(spot)
        Wind.update_forecasts(spot)
        Tide.update_forecasts(spot)
      end
    end

    def sorted_by_current_potential
      Spot.all.sort_by(&:current_potential).reverse
    end
  end

  # get latest model readings
  def current_swell
    swells.current
  end

  def current_wind
    winds.current
  end

  def last_tide
    tides.last_tide
  end

  def next_tide
    tides.next_tide
  end

  def low_tide
    last_tide.height < next_tide.height ? last_tide : next_tide
  end

  def high_tide
    last_tide.height > next_tide.height ? last_tide : next_tide
  end

  def tidal_range
    high_tide.height - low_tide.height
  end

  # TODO - move me to Spot helper
  def next_tide_subtext
    output = "#{next_tide.tide_type} tide "
    output += "(#{next_tide.date_time.strftime('%p')})"
    output += " <br />@ #{next_tide.height}m"
    output
  end

  def tide_period
    period = next_tide.date_time.localtime.to_i - last_tide.date_time.localtime.to_i
    (period /= 60.0).to_f
    (period /= 60.0).to_f
    period *= 2
    period.round(2)
  end

  def tide_delta_time(forecast_hrs)
    delta_time = (Time.zone.now + forecast_hrs.hours).to_i - last_tide.date_time.localtime.to_i
    (delta_time /= 60.0).to_f
    (delta_time /= 60.0).to_f
    delta_time.round(3)
  end

  def time_till_next_tide_hours
    time = ((next_tide.date_time.localtime.to_i - Time.zone.now.to_i) / 60 / 60)
    time.round(3)
  end

  # Try not to use for more than 6 hours, we will have new data by then anyway
  def tide_in_x_hours(hours)
    if last_tide.tide_type == 'low'
      tide_in_x = (tidal_range / 2) * sin((2 * PI / tide_period) * tide_delta_time(hours) - PI / 2) + (tidal_range / 2 + low_tide.height)
    elsif last_tide.tide_type == 'high'
      tide_in_x = (tidal_range / 2) * sin((2 * PI / tide_period) * tide_delta_time(hours) + PI / 2) + (tidal_range / 2 + low_tide.height)
    end
    tide_in_x.round(2)
  end

  def tide_shift_rate
    vals = %w[slow medium fast fast medium slow]
    sixth = ((tide_delta_time(0) / (tide_period / 2)) / (1 / 6)).floor
    vals[sixth]
  end

  def current_tide_height
    tide_in_x_hours(0)
  end

  def rate_of_change_tide
    tide_in_x_hours(3) - current_tide_height
  end

  def tide_remaining_or_to
    output = 'too_far_out'
    if current_tide_height.between?(tide_optimal_min_metres, tide_optimal_max_metres)
      if (last_tide.tide_type == 'low' && next_tide.height > tide_optimal_max_metres) ||
         (last_tide.tide_type == 'high' && next_tide.height < tide_optimal_min_metres)
        output = 'remaining'
      end
    else
      if (last_tide.tide_type == 'low' && next_tide.height > tide_optimal_min_metres) ||
         (last_tide.tide_type == 'high' && next_tide.height < tide_optimal_max_metres)
        output = 'till good'
      end
    end
    output
  end

  def tide_hours_remaining
    # FIXME: REDO THIS METHOD
    # return 0 unless tide_remaining_or_to
    # y_value = 0
    # if (tide_remaining_or_to == 'remaining' && last_tide.tide_type == 'low') ||
    #    (tide_remaining_or_to == 'till good' && last_tide.tide_type == 'high')
    #   y_value = tide_optimal_max_metres
    # elsif (tide_remaining_or_to == 'remaining' && last_tide.tide_type == 'high') ||
    #       (tide_remaining_or_to == 'till good' && last_tide.tide_type == 'low')
    #   y_value = tide_optimal_min_metres
    # end
    # blah = (y_value - (tidal_range / 2 + low_tide.height)) / (tidal_range / 2)
    # blah = blah.to_f
    # opt_tide_time = asin(blah) # get x value part 1
    # puts("#{opt_tide_time}=opt_tide_time")
    # opt_tide_time += (PI / 2).to_f
    # puts("#{opt_tide_time}=opt_tide_time")
    # opt_tide_time /= (2 * PI / tide_period) # get x value part 2
    # opt_tide_time = opt_tide_time * 60 * 60 # transform hours to seconds
    # puts("#{opt_tide_time}=opt_tide_time")
    # opt_tide_time = opt_tide_time.round(0) # round to nearest second
    # hours_remaining = (opt_tide_time + last_tide.date_time.localtime.to_i) - Time.zone.now.to_i # get seconds between current time and optimum tide intercept
    # hours_remaining = hours_remaining / 60.round(3) / 60.round(3) # transform seconds to hours
    # hours_remaining
    5
  end

  def works_on_all_tides?
    # if the optimal range for tide is 0 - 0, assume it works on all tides
    tide_optimal_max_metres.zero? && tide_optimal_min_metres.zero?
  end

  def tide_at_rating(rating)
    poseidon_math.value_given_rating(
      min_x: tide_optimal_max_metres,
      max_x: tide_optimal_min_metres,
      rating: rating
    )
  end

  def current_tide_rating
    return 100 if works_on_all_tides?
    poseidon_math.rating_given_x(
      min_x: tide_optimal_max_metres,
      max_x: tide_optimal_min_metres,
      x_value: current_tide_height
    )
  end

  def current_potential
    # calc aggregate potential rating based on tide/wind/swell (as a percentage)
    aggregate = 0.0
    aggregate += current_swell.rating * weighting_swell
    aggregate += current_wind.rating * weighting_wind
    aggregate += current_tide_rating * weighting_tide
    aggregate.round(0)
  end

  def set_willyweather_location_id_if_needed
    return if willyweather_location_id

    # TODO: please refactor me into a WillyWeather client under /lib :)
    # For example: https://goo.gl/HkHDgF
    response = RestClient.get(
      "https://api.willyweather.com.au/v2/#{ENV['WILLYWEATHER_API_KEY']}/search.json",
      {
        params: {
          'lat' => latitude,
          'lng' => longitude,
          'units' => 'distance:km'
        }
      }
    )

    self.willyweather_location_id = JSON.parse(response)['location']['id'].to_s
    self.save
  end

  def forecasts
    swell_forecasts = swells.five_day_forecast
    datetimes = swell_forecasts.pluck(:date_time)
    wind_forecasts = winds.where(date_time: datetimes)
    tide_forecasts = [] # TODO - create an abstract current tide model and pop it in here (into tide_forecasts)

    {
      swells: swell_forecasts,
      winds: wind_forecasts,
      tides: tide_forecasts
    }
  end

  def optimals
    spot_optimals = {}
    spot_optimals[:swell] = get_optimal_swell
    spot_optimals[:wind] = get_optimal_wind
    spot_optimals[:tide] = get_optimal_tide
    spot_optimals
  end

  private

  # TODO: also consider: 1 -moving these methods out for tidiness reasons or 2 - Make Optimals an abstract model with these methods

  def get_optimal_swell
    swell_in_3_hours = swells.in_three_hours
    {
      size: {
        type: 'linear',
        min: swell_size_at_rating(30.0)[:left].round(2),
        max: swell_size_at_rating(30.0)[:right].round(2),
        mixed_min: swell_size_at_rating(50.0)[:left].round(2),
        mixed_max: swell_size_at_rating(50.0)[:right].round(2),
        optimal_min: swell_optimal_size_min_metres,
        optimal_max: swell_optimal_size_max_metres,
        in_3_hours: swell_in_3_hours.size.round(2)
      },
      direction: {
        type: 'direction',
        min: swell_dir_at_rating(30.0)[:left].round(1),
        max: swell_dir_at_rating(30.0)[:right].round(1),
        mixed_min: swell_dir_at_rating(50.0)[:left].round(1),
        mixed_max: swell_dir_at_rating(50.0)[:right].round(1),
        optimal_min: normalise_swell_dir[:min_x],
        optimal_max: normalise_swell_dir[:max_x],
        in_3_hours: swell_in_3_hours.direction
      }
    }
  end

  def get_optimal_wind
    wind_in_3_hours = winds.in_three_hours
    {
      speed: {
        type: 'linear',
        min: wind_speed_at_rating(30.0)[:left].round(1),
        max: wind_speed_at_rating(30.0)[:right].round(1),
        mixed_min: wind_speed_at_rating(50.0)[:left].round(1),
        mixed_max: wind_speed_at_rating(50.0)[:right].round(1),
        optimal_min: wind_optimal_strength_min_kmh,
        optimal_max: wind_optimal_strength_max_kmh,
        in_3_hours: wind_in_3_hours.speed
      },
      direction: {
        type: 'direction',
        min: wind_dir_at_rating(30.0)[:left].round(1),
        max: wind_dir_at_rating(30.0)[:right].round(1),
        mixed_min: wind_dir_at_rating(50.0)[:left].round(1),
        mixed_max: wind_dir_at_rating(50.0)[:right].round(1),
        optimal_min: normalise_wind_dir[:min_x],
        optimal_max: normalise_wind_dir[:max_x],
        in_3_hours: wind_in_3_hours.direction
      }
    }
  end

  def get_optimal_tide
    {
      height: {
        type: 'linear',
        min: tide_at_rating(30.0)[:left].round(1),
        max: tide_at_rating(30.0)[:right].round(1),
        mixed_min: tide_at_rating(50.0)[:left].round(1),
        mixed_max: tide_at_rating(50.0)[:right].round(1),
        optimal_min: tide_optimal_min_metres,
        optimal_max: tide_optimal_max_metres,
        in_3_hours: tide_in_x_hours(3)
      }
    }
  end

  def normalise_wind_dir
    poseidon_math.normalise_degrees(
      min_x: wind_optimal_direction_min,
      max_x: wind_optimal_direction_max
    )
  end

  def normalise_swell_dir
    poseidon_math.normalise_degrees(
      min_x: swell_optimal_direction_min,
      max_x: swell_optimal_direction_max
    )
  end

  def swell_size_at_rating(rating)
    poseidon_math.value_given_rating(
      min_x: swell_optimal_size_min_metres,
      max_x: swell_optimal_size_max_metres,
      rating: rating
    )
  end

  def swell_dir_at_rating(rating)
    data = poseidon_math.normalise_degrees(
      min_x: swell_optimal_direction_min,
      max_x: swell_optimal_direction_max,
      rating: rating
    )
    poseidon_math.value_given_rating(data)
  end

  def wind_dir_at_rating(rating)
    data = poseidon_math.normalise_degrees(
      min_x: wind_optimal_direction_min,
      max_x: wind_optimal_direction_max,
      rating: rating
    )
    poseidon_math.value_given_rating(data)
  end

  def wind_speed_at_rating(rating)
    poseidon_math.value_given_rating(
      min_x: wind_optimal_strength_min_kmh,
      max_x: wind_optimal_strength_max_kmh,
      rating: rating
    )
  end

  def poseidon_math
    @poseidon_math ||= PoseidonMath.new
  end
end
