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

  has_many :weather_day_summaries
  has_many :weather_precis
  has_many :uv_indices
  has_many :sunrise_sunsets

  has_many :spots_features
  has_many :features, :through => :spots_features

  validates :name, presence: true

  before_save :default_values

  scope :not_hidden, -> { where(hidden: false) }

  attr_reader :current_swell
  attr_reader :current_wind
  attr_reader :current_tide_snapshot
  attr_reader :last_tide
  attr_reader :next_tide
  attr_reader :next_high_tide
  attr_reader :next_low_tide

  def self.update_forecasts
    Spot.all.each do |spot|
      Swell.update_forecasts(spot)
      Wind.update_forecasts(spot)
      Tide.update_forecasts(spot)

      UvIndex.update_forecasts(spot)
      WeatherDaySummary.update_forecasts(spot)
      WeatherPrecis.update_forecasts(spot)

      SunriseSunset.update_forecasts(spot)
    end
  end

  def self.sorted_by_current_potential
    response = []
    spots = Spot.not_hidden.sort_by(&:current_potential).reverse

    # Filter spots without forecast data
    spots.each do |spot|
      response << spot if spot.has_forecast_data?
    end

    response
  end

  def retrieve_forecast_data_if_needed
    return if @current_swell && @current_wind && @current_tide_snapshot
    @current_swell = swells.current
    @current_wind = winds.current
    @current_tide_snapshot = tides.current_snapshot(self)
    @last_tide = @current_tide_snapshot.tide_before
    @next_tide = @current_tide_snapshot.tide_after
    @next_high_tide = @current_tide_snapshot.high_tide
    @next_low_tide = @current_tide_snapshot.low_tide
  end

  def tide_remaining_or_to
    output = 'too_far_out'
    if @current_tide_snapshot.height.between?(tide_optimal_min_metres, tide_optimal_max_metres)
      if (@last_tide.tide_type == 'low' && @next_tide.height > tide_optimal_max_metres) ||
         (@last_tide.tide_type == 'high' && @next_tide.height < tide_optimal_min_metres)
        output = 'remaining'
      end
    else
      if (@last_tide.tide_type == 'low' && @next_tide.height > tide_optimal_min_metres) ||
         (@last_tide.tide_type == 'high' && @next_tide.height < tide_optimal_max_metres)
        output = 'till good'
      end
    end
    output
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


  def current_potential
    return 0 if no_forecast_data?
    retrieve_forecast_data_if_needed
    aggregate = calculate_potential(@current_swell, @current_wind, @current_tide_snapshot)
    aggregate.round(0)
  end

  # TODO: Create a similar method, but for potential_for(date_time)
  def calculate_potential(swell, wind, tide)
    # calc aggregate potential rating based on tide/wind/swell (as a percentage)
    aggregate = 0.0
    aggregate += swell.rating * weighting_swell
    aggregate += wind.rating * weighting_wind
    aggregate += tide.rating * weighting_tide
    aggregate
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
    swell_forecasts = swells.seven_day_forecast
    date_times = swell_forecasts
                 .pluck(:date_time)
    wind_forecasts = winds
                     .where(date_time: date_times)
                     .order(date_time: :asc) # uses a sql IN method
    tide_forecasts = tides
                     .get_snapshots(date_times, self)
    overall_ratings = []

    # Calculate potential ratings for forecasts
    date_times.each do |date_time|
      swell_forecast = swell_forecasts.find { |forecast| date_time == forecast.date_time }
      wind_forecast = wind_forecasts.find { |forecast| date_time == forecast.date_time }
      tide_forecast = tide_forecasts.find { |forecast| date_time == forecast.date_time }
      rating = calculate_potential(swell_forecast, wind_forecast, tide_forecast)
      overall_ratings << { date_time: date_time, rating: rating }
    end

    {
      overall_ratings: overall_ratings,
      swells: swell_forecasts,
      winds: wind_forecasts,
      tides: tide_forecasts
    }
  end

  def optimals
    spot_optimals = {}
    spot_optimals[:swell] = optimal_swell
    spot_optimals[:wind] = optimal_wind
    spot_optimals[:tide] = optimal_tide
    spot_optimals
  end

  def no_forecast_data?
    swells.empty? || winds.empty? || tides.empty?
  end

  def has_forecast_data?
    !no_forecast_data?
  end

  def current_model_date_time
    current_swell.date_time
  end

  private

  # TODO: also consider: 1 -moving these methods out for tidiness reasons or 2 - Make Optimals an abstract model with these methods

  def optimal_swell
    swell_in_3_hours = swells.in_three_hours
    {
      size: {
        type: 'linear',
        optimal: swell_size_at_rating(100)[:left].round(1),
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
        optimal: swell_dir_at_rating(100)[:left].round(1),
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

  def optimal_wind
    wind_in_3_hours = winds.in_three_hours
    {
      speed: {
        type: 'linear',
        optimal: wind_speed_at_rating(100)[:left].round(1),
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
        optimal: wind_dir_at_rating(100)[:left].round(1),
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

  def optimal_tide
    {
      height: {
        type: 'linear',
        optimal: tide_at_rating(100)[:left].round(1),
        min: tide_at_rating(30.0)[:left].round(1),
        max: tide_at_rating(30.0)[:right].round(1),
        mixed_min: tide_at_rating(50.0)[:left].round(1),
        mixed_max: tide_at_rating(50.0)[:right].round(1),
        optimal_min: tide_optimal_min_metres,
        optimal_max: tide_optimal_max_metres,
        in_3_hours: current_tide_snapshot.height_in_x_hours(3)
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

  def default_values
    self.hidden = false if self.hidden.nil?
  end
end
