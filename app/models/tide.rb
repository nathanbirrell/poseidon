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

  scope :last_tide, -> () {
    where("date_time <= ?", Time.current).order(date_time: :desc).first
  }
  scope :next_tide, -> () {
    where("date_time >= ?", Time.current).order(date_time: :asc).first
  }

  scope :tide_before, lambda { |date_time, spot_id|
    where(spot_id: spot_id)
      .where('date_time <= ?', date_time)
      .order(date_time: :desc)
      .first
  }
  scope :tide_after, lambda { |date_time, spot_id|
    where(spot_id: spot_id)
      .where('date_time >= ?', date_time)
      .order(date_time: :asc)
      .first
  }

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::TideForecasts.fetch(spot)
    forecasts.save_entries
  end

  def self.get_snapshots(date_times)
    # TODO
    # get a TideSnapshot for each date_times
  end

  # Consider a snapshot like an instance of Tide, but for a specific time
  # See tide/tide_snapshot.rb for more
  def self.get_snapshot(date_time)
    TideSnapshot.new(date_time, spot_id)
  end

  def self.current_snapshot
    TideSnapshot.new(Time.current, spot_id)
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
