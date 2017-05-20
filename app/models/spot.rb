# == Schema Information
#
# Table name: spots
#
#  id                                  :integer          not null, primary key
#  name                                :string
#  description                         :string
#  season                              :string
#  created_at                          :datetime         not null
#  updated_at                          :datetime         not null
#  latitude                            :decimal(10, 6)
#  longitude                           :decimal(10, 6)
#  image                               :string
#  region_id                           :integer
#  tide_optimal_min_metres             :decimal(, )
#  tide_optimal_max_metres             :decimal(, )
#  swell_optimal_size_min_metres       :decimal(, )
#  swell_optimal_size_max_metres       :decimal(, )
#  swell_optimal_period_seconds        :decimal(, )
#  swell_optimal_direction_min_degrees :integer
#  swell_optimal_direction_max_degrees :integer
#  wind_optimal_strength_min_kmh       :decimal(, )
#  wind_optimal_strength_max_kmh       :decimal(, )
#  wind_optimal_direction_min_degrees  :integer
#  wind_optimal_direction_max_degrees  :integer
#  wave_model_lat                      :decimal(, )
#  wave_model_lon                      :decimal(, )
#  willyweather_location_id            :integer
#

class Spot < ApplicationRecord
  include ActiveModel::Validations
  include Math
  include Slack

  belongs_to :region

  has_many :tides
  has_many :winds
  has_many :swells

  validates :name, presence: true


  Slack.configure do |config|
    config.token = ENV['xoxb-185652955797-JOLjSoHyTIuxb6n8ZNV6BPih']
  end

  client = Slack::Web::Client.new
  client.auth_test

  # get latest model readings
  def current_swell
    Swell.current(id)
  end
  def current_wind
    Wind.current(id)
  end
  def last_tide
    Tide.last_tide(id)
  end
  def next_tide
    Tide.next_tide(id)
  end

  def low_tide
    return last_tide.height < next_tide.height ? last_tide : next_tide
  end

  def high_tide
    return last_tide.height > next_tide.height ? last_tide : next_tide
  end

  def tidal_range
    return high_tide.height - low_tide.height
  end

  def tide_period
    period = next_tide.date_time.localtime.to_i - last_tide.date_time.localtime.to_i
    period = period/60
    period = period/60.round(2)
    period = period*2
  end

  def tide_delta_time
    delta_time = Time.zone.now.to_i - last_tide.date_time.localtime.to_i
    delta_time = delta_time/60
    delta_time = delta_time/60.round(3)
  end

  def current_tide_height
    if last_tide.tide_type == 'low'
      curr_tide = (tidal_range/2)*sin((2*PI/tide_period) * tide_delta_time - PI/2) + (tidal_range/2 + low_tide.height)
    elsif last_tide.tide_type == 'high'
      curr_tide = (tidal_range/2)*sin((2*PI/tide_period) * tide_delta_time + PI/2) + (tidal_range/2 + low_tide.height)
    end
    return curr_tide.round(2)
  end

  def current_tide_rating
    return 1.0
  end

  def current_potential
    # calculate aggregate potential rating based on tide/wind/swell (as a percentage)
    aggregate = 0.0

    # aggregate += current_tide.rating / 3.0 # TODO: uncomment me when @Taylor completes current tide calcs
    aggregate += current_wind.rating / 3.0
    aggregate += current_swell.rating / 3.0

    aggregate = aggregate * 100
    aggregate.round(3)
  end
end
