# == Schema Information
#
# Table name: tides
#
#  id         :integer          not null, primary key
#  tide_type  :string
#  height     :decimal(, )
#  spot_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  date_time  :datetime
#

class Tide < WeatherForecast
  # default_scope { order(date_time: :desc) }
  belongs_to :spot

  scope :last_tide, -> (spot_id) {
    where(spot_id: spot_id).where("date_time <= ?", Time.current).order(date_time: :desc).first
  }
  scope :next_tide, -> (spot_id) {
    where(spot_id: spot_id).where("date_time >= ?", Time.current).order(date_time: :asc).first
  }

  class << self
    def fetch_forecasts(spot)
      spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
      forecasts = WillyweatherClient::TideForecasts.fetch(spot)
      forecasts.save_entries
    end
  end

  def to_builder
    Jbuilder.new do |tide|
      tide.id id
      tide.tide_type tide_type
      tide.height height
      tide.date_time date_time
    end
  end
end
